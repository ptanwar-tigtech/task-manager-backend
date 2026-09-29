import {
    getAllTasks,
    findTaskById,
    createTask,
    updateTaskService,
    deleteTaskService,
    getTaskStats
} from "../../services/taskService.js";

import redisClient from "../../database/config/redis.js";


export const getTasks = async (req, res, next) => {
    try {
        const cacheKey = `tasks:user:${req.user.id}`;

        const cachedTask = await redisClient.get(cacheKey);

        if (cachedTask) {
            console.log("Data from Redis");
            return res.status(200).json(JSON.parse(cachedTask));
        }

        console.log("Data from PostgreSQL");

        const tasks = await getAllTasks(req.query, req.user.id);

        await redisClient.set(
            cacheKey,
            JSON.stringify(tasks),
            {
                EX: 60
            }
        );

        console.log("Saved in Redis:", cacheKey);

        res.status(200).json(tasks);

    } catch (error) {
        next(error);
    }
};

export const getTaskStatsController = async (req, res, next) => {
    try {
        const minCount = req.query.minCount || 0;
        const stats = await getTaskStats(req.user.id, minCount);

        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
}


export const getTaskById = async (req, res, next) => {
    try {
        const task = await findTaskById(req.params.id);

        res.status(200).json(task);

    } catch (error) {
        next(error);
    }
};


export const creatNewTask = async (req, res, next) => {
    try {
        const newTask = await createTask({
            ...req.body,
            userId: req.user.id
        });

        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
};


export const updateTaskById = async (req, res, next) => {
    try {
        const task = await updateTaskService(
            req.params.id,
            req.body
        );

        res.status(200).json(task);

    } catch (error) {
        next(error);
    }
};


export const deleteTaskById = async (req, res, next) => {
    try {
        const deletedTask = await deleteTaskService(
            req.params.id
        );

        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });

    } catch (error) {
        next(error);
    }
};

export const uploadAttachment = (req, res) => {
    console.log(req.file);

    res.status(200).json({
        message: "file uploded successfully",
        file: req.file
    })
}