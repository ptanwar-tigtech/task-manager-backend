import { Queue } from "bullmq";

const emailQueue = new Queue("email-queue", {
    connection: {
       host: "my-redis",
        port: 6379
    }
})

export default emailQueue;