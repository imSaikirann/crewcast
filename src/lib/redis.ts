import { Redis as UpstashRedis } from "@upstash/redis";
import IORedis from "ioredis";

type CacheClient = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ex?: number): Promise<void>;
  del(...keys: string[]): Promise<void>;
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<void>;
};

const globalForRedis = globalThis as unknown as {
  localRedis?: IORedis;
  cacheClient?: CacheClient;
};

const isProduction = process.env.NODE_ENV === "production";

function createCacheClient(): CacheClient {
  if (isProduction) {
    return createUpstashClient();
  }

  return createLocalRedisClient();
}

function createUpstashClient(): CacheClient {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn("Upstash Redis credentials are missing. Production cache is disabled.");
    return createNoopClient();
  }

  const upstash = new UpstashRedis({
    url,
    token,
  });

  return {
    async get(key) {
      const value = await upstash.get<string>(key);
      return value ?? null;
    },
    async set(key, value, ex) {
      if (ex) {
        await upstash.set(key, value, { ex });
        return;
      }

      await upstash.set(key, value);
    },
    async del(...keys) {
      if (keys.length) {
        await upstash.del(...keys);
      }
    },
    async incr(key) {
      return upstash.incr(key);
    },
    async expire(key, seconds) {
      await upstash.expire(key, seconds);
    },
  };
}

function createNoopClient(): CacheClient {
  return {
    async get() {
      return null;
    },
    async set() {},
    async del() {},
    async incr() {
      throw new Error("Cache client is disabled");
    },
    async expire() {},
  };
}

function createLocalRedisClient(): CacheClient {
  const redis =
    globalForRedis.localRedis ??
    new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });

  if (!isProduction) {
    globalForRedis.localRedis = redis;
  }

  return {
    async get(key) {
      return redis.get(key);
    },
    async set(key, value, ex) {
      if (ex) {
        await redis.set(key, value, "EX", ex);
        return;
      }

      await redis.set(key, value);
    },
    async del(...keys) {
      if (keys.length) {
        await redis.del(...keys);
      }
    },
    async incr(key) {
      return redis.incr(key);
    },
    async expire(key, seconds) {
      await redis.expire(key, seconds);
    },
  };
}

const cacheClient = globalForRedis.cacheClient ?? createCacheClient();

if (!isProduction) {
  globalForRedis.cacheClient = cacheClient;
}

export async function cacheGet<T = string>(key: string) {
  try {
    const value = await cacheClient.get(key);
    return value as T | null;
  } catch (error) {
    console.warn(`Cache GET failed for ${key}:`, error);
    return null;
  }
}

export async function cacheSet(key: string, value: string, ex?: number) {
  try {
    await cacheClient.set(key, value, ex);
  } catch (error) {
    console.warn(`Cache SET failed for ${key}:`, error);
  }
}

export async function cacheDel(...keys: string[]) {
  try {
    await cacheClient.del(...keys);
  } catch (error) {
    console.warn("Cache DEL failed:", error);
  }
}

export async function cacheIncr(key: string) {
  try {
    return await cacheClient.incr(key);
  } catch (error) {
    console.warn(`Cache INCR failed for ${key}:`, error);
    return null;
  }
}

export async function cacheExpire(key: string, seconds: number) {
  try {
    await cacheClient.expire(key, seconds);
  } catch (error) {
    console.warn(`Cache EXPIRE failed for ${key}:`, error);
  }
}
