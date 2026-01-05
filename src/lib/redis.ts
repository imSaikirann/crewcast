import Redis from "ioredis";

export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: 1, 
  retryStrategy: (times) => {
    if (times > 3) return null; 
    return 200;
  },
});
