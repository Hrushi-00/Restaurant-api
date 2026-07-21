import { createQueue } from "../config/bullmq.js";

const EMAIL_QUEUE = "email";

const emailQueue = createQueue(EMAIL_QUEUE);

const enqueueEmailJob = async (name, data = {}) => {
  if (!emailQueue) {
    return null;
  }

  try {
    return await emailQueue.add(name, data);
  } catch (error) {
    console.error("Failed to enqueue email job:", error.message);
    return null;
  }
};

export { EMAIL_QUEUE, emailQueue, enqueueEmailJob };
