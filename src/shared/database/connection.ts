import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config/environment";

// export const sequelize = new Sequelize("sqlite::memory:");

export const sequelize = new Sequelize(DB_NAME + "", DB_USER + "", DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
});
