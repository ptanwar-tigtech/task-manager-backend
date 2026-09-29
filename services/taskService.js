import AppError from "../utils/AppError.js";
import db from "../database/models/index.js";
import { Op, fn, col, literal, where } from "sequelize";

const {Task, sequelize, TaskActivity} = db;

export const getAllTasks = async (query, userId) => {

    const {
        title,
        status,
        priority,
        from,
        to,
        sortBy = "createdAt",
        order = "DESC",
        limit = 10,
        offset = 0
    } = query;

    const where = {
        userId
    };

    if (title) {
        where.title = {
            [Op.iLike]: `%${title}%`
        };
    }

    if (status) {
        where.status = {
            [Op.in]: status.split(",")
        };
    }

    if (priority) {
        where.priority = {
            [Op.in]: priority.split(",")
        };
    }

    if (from && to) {
        where.createdAt = {
            [Op.between]: [from, to]
        };
    }

    const allowedSortFields = [
        "id",
        "title",
        "status",
        "priority",
        "createdAt",
        "updatedAt"
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : "createdAt";

    const safeOrder = order.toUpperCase() === "ASC"
        ? "ASC"
        : "DESC";

    const tasks = await Task.findAll({
        where,

        order: [
            [safeSortBy, safeOrder]
        ],

        limit: Number(limit),
        offset: Number(offset)
    });

    return tasks;
};

export const getTaskStats = async(userId, minCount=0)=>{
    const stats = await Task.findAll({
        attributes: [
            "status",
            [fn("COUNT", col("id")), "total"]
        ],

        where:{
            userId
        },

        group: ["status"],

        having: literal(`COUNT("Task"."id") > ${Number(minCount)}`)

    })

    return stats;
}

export const findTaskById = async (id) => {

    const task = await Task.findByPk(id);

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    return task;
};

export const createTask = async (taskData) => {

    const transaction = await sequelize.transaction();

    try{
        const newTask = await Task.create(taskData, {transaction});

        await TaskActivity.create({
            taskId : newTask.id,
            action: "task created"
        },

        {transaction}
    
        )

        await transaction.commit();

        return newTask
    }catch(error){
        await transaction.rollback();
        throw error;
    }
};

export const updateTaskService = async (id, taskData) => {

    const task = await Task.findByPk(id);

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    await task.update(taskData);

    return task;
};

export const deleteTaskService = async (id) => {

    const task = await Task.findByPk(id);

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    await task.destroy();

    return task;
};