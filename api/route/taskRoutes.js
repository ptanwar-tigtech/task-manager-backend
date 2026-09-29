import express from "express";
import { getTasks, getTaskById, creatNewTask, updateTaskById, deleteTaskById, uploadAttachment , getTaskStatsController} from "../controller/taskController.js";
import { validate } from "../../middleware/validate.js";
import { createTaskSchema } from "../schemas/taskSchema.js";
import auth from "../../middleware/auth.js";
import upload from "../../middleware/uploads.js";
import redisClient from "../../database/config/redis.js";

const router = express.Router();

router.get("/redis-test", async(req , res)=>{
    await redisClient.set("message", "hellow from node.js");
    const value = await redisClient.get("message");

    res.json({
        message: value
    })
})

router.use(auth);

router.get("/", getTasks);

router.get("/stats", getTaskStatsController);

router.get("/:id", getTaskById);

router.post("/",validate(createTaskSchema), creatNewTask);

router.patch("/:id", updateTaskById);

router.delete("/:id", deleteTaskById);

router.post(
    "/:id/attachment",
    upload.single("attachment"),
    uploadAttachment
);
export default router;