import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import { connectRedis, disconnectRedis } from "./config/redis.js";
import { closeBullMQ } from "./config/bullmq.js";

const PORT = process.env.PORT || 5000;

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  try {
    await closeBullMQ();
  } catch (error) { 
    console.error("BullMQ shutdown failed:", error.message);
  }

  try {
    await disconnectRedis();
  } catch (error) {
    console.error("Redis disconnect failed:", error.message);
  }

  process.exit(0);
};

// Connect Database
await connectDB();
await connectRedis();

// Start Server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`

 RestroFlow Server Started
 URL   : http://localhost:${PORT}
 ENV   : ${process.env.NODE_ENV}

`);
});

process.on("SIGINT", () => {
  server.close(() => shutdown("SIGINT"));
});

process.on("SIGTERM", () => {
  server.close(() => shutdown("SIGTERM"));
});
