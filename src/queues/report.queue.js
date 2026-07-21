import { createQueue } from "../config/bullmq.js";

const REPORT_QUEUE = "report";

const reportQueue = createQueue(REPORT_QUEUE);

const enqueueReportJob = async (name, data = {}) => {
  if (!reportQueue) {
    return null;
  }

  try {
    return await reportQueue.add(name, data);
  } catch (error) {
    console.error("Failed to enqueue report job:", error.message);
    return null;
  }
};

export { REPORT_QUEUE, reportQueue, enqueueReportJob };
