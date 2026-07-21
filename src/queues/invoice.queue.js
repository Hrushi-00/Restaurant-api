import { createQueue } from "../config/bullmq.js";

const INVOICE_QUEUE = "invoice";

const invoiceQueue = createQueue(INVOICE_QUEUE);

const enqueueInvoiceJob = async (name, data = {}) => {
  if (!invoiceQueue) {
    return null;
  }

  try {
    return await invoiceQueue.add(name, data);
  } catch (error) {
    console.error("Failed to enqueue invoice job:", error.message);
    return null;
  }
};

export { INVOICE_QUEUE, invoiceQueue, enqueueInvoiceJob };
