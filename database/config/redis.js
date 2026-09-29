import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://my-redis:6379",
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

await redisClient.connect();

console.log("Redis Connected");

export default redisClient;