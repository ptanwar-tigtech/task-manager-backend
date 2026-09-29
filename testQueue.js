import emailQueue from "./queues/emailQueue.js";

await emailQueue.upsertJobScheduler(
    "every-minute-job",
    {
        every: 60 * 1000
    },
    {
        name: "generate-report",
        data: {
            message: "Report generated"
        }
    }
);

console.log("Scheduled job created");