import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

const redisClient = redisUrl
  ? createClient({
      url: redisUrl,
    })
  : null;

if (redisClient) {
  redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error.message);
  });

  redisClient.on("connect", () => {
    console.log("Redis connecting...");
  });

  redisClient.on("ready", () => {
    console.log("Redis Connected");
  });
}

const connectRedis = async () => {
  if (!redisClient) {
    console.warn("REDIS_URL is not set. Redis is disabled.");
    return null;
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
};

const disconnectRedis = async () => {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }
};

export { connectRedis, disconnectRedis };
export default redisClient;
