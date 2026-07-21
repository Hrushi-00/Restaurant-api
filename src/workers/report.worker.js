import { createWorker } from "../config/bullmq.js";
import { REPORT_QUEUE } from "../queues/report.queue.js";

const processReportJob = async (job) => {
  const { reportType, restaurantId, from, to } = job.data || {};

  console.log(
    `[report] job=${job.id} name=${job.name} type=${reportType || "n/a"}`
  );

  return {
    generated: true,
    reportType: reportType || null,
    restaurantId: restaurantId || null,
    range: {
      from: from || null,
      to: to || null,
    },
  };
};

const reportWorker = createWorker(REPORT_QUEUE, processReportJob);

export { reportWorker };
