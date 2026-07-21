import { createWorker } from "../config/bullmq.js";
import { SMS_QUEUE } from "../queues/sms.queue.js";

const processSmsJob = async (job) => {
  const { phone, message } = job.data || {};

  console.log(
    `[sms] job=${job.id} name=${job.name} phone=${phone || "n/a"}`
  );

  return {
    sent: true,
    phone: phone || null,
    messagePreview: message ? String(message).slice(0, 160) : null,
  };
};

const smsWorker = createWorker(SMS_QUEUE, processSmsJob);

export { smsWorker };
