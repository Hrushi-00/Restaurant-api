import { createWorker } from "../config/bullmq.js";
import { EMAIL_QUEUE } from "../queues/email.queue.js";

const processEmailJob = async (job) => {
  const { to, subject, text, html } = job.data || {};

  console.log(
    `[email] job=${job.id} name=${job.name} to=${to || "n/a"} subject=${
      subject || "n/a"
    }`
  );

  return {
    delivered: true,
    to: to || null,
    subject: subject || null,
    hasText: Boolean(text),
    hasHtml: Boolean(html),
  };
};

const emailWorker = createWorker(EMAIL_QUEUE, processEmailJob);

export { emailWorker };
