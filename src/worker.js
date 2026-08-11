import "./config/env.js";
import "./workers/index.js";
import { closeBullMQ } from "./config/bullmq.js";

const shutdown = async (signal) => {
  console.log(`${signal} received. Stopping workers...`);

  try {
    await closeBullMQ();
  } catch (error) {
    console.error("BullMQ shutdown failed:", error.message);
  }

  process.exit(0);
};

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

console.log("RestroFlow worker process started");
