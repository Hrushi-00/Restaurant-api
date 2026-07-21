import { Queue, Worker } from "bullmq";

const redisUrl = process.env.REDIS_URL;

const bullmqEnabled = Boolean(redisUrl);

const queues = [];
const workers = [];

const queueConfig = bullmqEnabled
  ? {
      connection: {
        url: redisUrl,
      },
    }
  : null;

const createQueue = (name, defaults = {}) => {
  if (!bullmqEnabled) {
    return null;
  }

  const queue = new Queue(name, {
    ...queueConfig,
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: 100,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      ...defaults,
    },
  });

  queues.push(queue);
  return queue;
};

const createWorker = (name, processor, options = {}) => {
  if (!bullmqEnabled) {
    return null;
  }

  const worker = new Worker(name, processor, {
    ...queueConfig,
    concurrency: 5,
    ...options,
  });

  worker.on("error", (error) => {
    console.error(`${name} worker error:`, error.message);
  });

  worker.on("failed", (job, error) => {
    console.error(
      `${name} job failed${job ? ` (${job.id})` : ""}:`,
      error.message
    );
  });

  workers.push(worker);
  return worker;
};

const closeBullMQ = async () => {
  const workerClosures = [...workers].reverse().map((worker) => worker.close());
  const queueClosures = [...queues].reverse().map((queue) => queue.close());

  await Promise.allSettled([...workerClosures, ...queueClosures]);
};

export { bullmqEnabled, createQueue, createWorker, closeBullMQ };
