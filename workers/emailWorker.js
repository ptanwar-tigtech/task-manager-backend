import { Worker } from "bullmq";

const worker = new Worker(
    "email-queue",
    async (job) => {
        console.log(
            `Job executed: ${job.name}`,
            new Date().toLocaleTimeString()
        );

        console.log(job.data);
    },
    {
        connection: {
           host: "my-redis",
            port: 6379
        }
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.log(
        `Job ${job.id} failed. Attempts ${job.attemptsMade}:`,
        err.message
    );
});