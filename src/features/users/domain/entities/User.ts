import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/database/connection.ts";

export class User extends Model {
    declare id: string;
    declare name: string;
    declare lastName: string;
    declare email: string;
    declare passwordHash: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        passwordHash: DataTypes.STRING,
    },
    { sequelize, modelName: "User" }
);
