import { createQueue } from "../config/bullmq.js";

const SMS_QUEUE = "sms";

const smsQueue = createQueue(SMS_QUEUE);

const enqueueSmsJob = async (name, data = {}) => {
  if (!smsQueue) {
    return null;
  }

  try {
    return await smsQueue.add(name, data);
  } catch (error) {
    console.error("Failed to enqueue SMS job:", error.message);
    return null;
  }
};

export { SMS_QUEUE, smsQueue, enqueueSmsJob };
