import { cacheDel, cacheGet, cacheSet } from "@/lib/redis";

type CachedJsonOptions = {
  ttl: number;
  key: string;
};

export async function cachedJson<T>(
  options: CachedJsonOptions,
  loader: () => Promise<T>
): Promise<T> {
  const cached = await cacheGet<string>(options.key);
  if (cached) {
    try {
      return JSON.parse(cached) as T;
    } catch {
      await cacheDel(options.key);
    }
  }

  const value = await loader();
  await cacheSet(options.key, JSON.stringify(value), options.ttl);
  return value;
}

export async function invalidateCache(...keys: string[]) {
  await cacheDel(...keys);
}
