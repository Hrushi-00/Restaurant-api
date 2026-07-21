import { createQueue } from "../config/bullmq.js";

const NOTIFICATION_QUEUE = "notification";

const notificationQueue = createQueue(NOTIFICATION_QUEUE);

const enqueueNotificationJob = async (name, data = {}) => {
  if (!notificationQueue) {
    return null;
  }

  try {
    return await notificationQueue.add(name, data);
  } catch (error) {
    console.error("Failed to enqueue notification job:", error.message);
    return null;
  }
};

export { NOTIFICATION_QUEUE, notificationQueue, enqueueNotificationJob };
