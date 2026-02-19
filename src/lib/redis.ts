import Redis from "ioredis"

let redis: Redis | null = null

export function getRedis() {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_URL || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      maxRetriesPerRequest: 1,
      retryStrategy: (times) => {
        if (times > 3) return null
        return 200
      },
    })

    redis.on("error", () => {
      // prevent unhandled crash
    })
  }

  return redis
}
