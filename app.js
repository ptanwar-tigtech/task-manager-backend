import express from "express";
import taskRoutes from "./api/route/taskRoutes.js";
import authRoute from "./api/route/authRoutes.js";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import "dotenv/config";
import redisClient from "./database/config/redis.js";


import db from "./database/models/index.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(express.static("public"));

app.use("/auth", authRoute);

app.use("/tasks", taskRoutes);

app.use(errorHandler);

const { sequelize } = db;

sequelize
    .authenticate()
    .then(() => {
        console.log("PostgreSQL connected successfully");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
