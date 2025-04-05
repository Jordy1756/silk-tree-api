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
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "USER_ID",
        },
        name: {
            type: DataTypes.STRING(30),
            validate: { notEmpty: true },
            field: "NAME",
        },
        lastName: {
            type: DataTypes.STRING(50),
            validate: { notEmpty: true },
            field: "LAST_NAME",
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: { isEmail: true, notEmpty: true },
            field: "EMAIL",
        },

        passwordHash: {
            type: DataTypes.STRING,
            validate: { notEmpty: true },
            field: "PASSWORD_HASH",
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "USER",
        timestamps: false,
    }
);
