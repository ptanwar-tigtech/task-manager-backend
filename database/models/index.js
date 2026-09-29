import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import config from "../config/config.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: false
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const files = fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (
            file.endsWith(".js") &&
            file !== "index.js"
        );
    });

for (const file of files) {
    const modelModule = await import(
        pathToFileURL(path.join(__dirname, file)).href
    );

    const model = modelModule.default(sequelize);

    db[model.name] = model;
}

Object.values(db).forEach((model) => {
    if (model?.associate) {
        model.associate(db);
    }
});

export default db;