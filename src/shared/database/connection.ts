import { Sequelize } from "sequelize";
import { DB_URL } from "../config/environment";

export const sequelize = new Sequelize(DB_URL);
