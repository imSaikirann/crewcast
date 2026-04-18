import Redis from "ioredis";

const globalForRedis = global as unknown as {
  redis: Redis | undefined;
};

export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
  });

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export async function cacheGet<T = string>(key: string) {
  try {
    const value = await redis.get(key);
    return value as T | null;
  } catch (error) {
    console.warn(`Redis GET failed for ${key}:`, error);
    return null;
  }
}

export async function cacheSet(key: string, value: string, ex?: number) {
  try {
    if (ex) {
      await redis.set(key, value, "EX", ex);
    } else {
      await redis.set(key, value);
    }
  } catch (error) {
    console.warn(`Redis SET failed for ${key}:`, error);
  }
}

export async function cacheDel(...keys: string[]) {
  try {
    if (keys.length) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.warn("Redis DEL failed:", error);
  }
}

