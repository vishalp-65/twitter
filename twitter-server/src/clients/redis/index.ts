import Redis from "ioredis";

export const redisClient = new Redis(process.env.REDIS_URL as string, {
    maxRetriesPerRequest: 20,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
    connectTimeout: 10000,
});
