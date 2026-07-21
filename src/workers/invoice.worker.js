import { createWorker } from "../config/bullmq.js";
import { INVOICE_QUEUE } from "../queues/invoice.queue.js";

const processInvoiceJob = async (job) => {
  const { invoiceId, restaurantId, amount } = job.data || {};

  console.log(
    `[invoice] job=${job.id} name=${job.name} invoiceId=${invoiceId || "n/a"}`
  );

  return {
    generated: true,
    invoiceId: invoiceId || null,
    restaurantId: restaurantId || null,
    amount: amount ?? null,
  };
};

const invoiceWorker = createWorker(INVOICE_QUEUE, processInvoiceJob);

export { invoiceWorker };
