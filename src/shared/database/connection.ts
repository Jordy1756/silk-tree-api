import { Sequelize } from "sequelize";
import { DB_URL } from "../config/environment.js";

export const sequelize = new Sequelize(DB_URL);
