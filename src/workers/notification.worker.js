import { createWorker } from "../config/bullmq.js";
import { NOTIFICATION_QUEUE } from "../queues/notification.queue.js";

const processNotificationJob = async (job) => {
  const { userId, title, message, type } = job.data || {};

  console.log(
    `[notification] job=${job.id} name=${job.name} userId=${
      userId || "n/a"
    } type=${type || "n/a"}`
  );

  return {
    delivered: true,
    userId: userId || null,
    title: title || null,
    message: message || null,
    type: type || null,
  };
};

const notificationWorker = createWorker(
  NOTIFICATION_QUEUE,
  processNotificationJob
);

export { notificationWorker };
