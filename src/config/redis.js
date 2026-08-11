import "./env.js";
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;
let redisDisabled = false;

const redisClient = redisUrl
  ? createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 3000,
        reconnectStrategy: false,
      },
    })
  : null;

if (redisClient) {
  redisClient.on("error", (error) => {
    const message = error?.message || error?.code || String(error);
    console.error("Redis Client Error:", message);
  });

  redisClient.on("connect", () => {
    console.log("Redis connecting...");
  });

  redisClient.on("ready", () => {
    console.log("Redis Connected");
  });
}

const connectRedis = async () => {
  if (!redisClient || redisDisabled) {
    console.warn("REDIS_URL is not set. Redis is disabled.");
    return null;
  }

  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
    } catch (error) {
      const message = error?.message || error?.code || String(error);
      console.warn(`Redis unavailable. Continuing without Redis: ${message}`);
      if (redisClient.isOpen) {
        try {
          redisClient.destroy();
        } catch {
          // The client may already be closed after a failed connect attempt.
        }
      }
      redisDisabled = true;
      return null;
    }
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
