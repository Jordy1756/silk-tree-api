import { STRING, UUIDV4, Model } from "sequelize";
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
            type: UUIDV4,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        name: {
            type: STRING(30),
            validate: { notEmpty: true },
        },
        lastName: {
            type: STRING(50),
            validate: { notEmpty: true },
        },
        email: {
            type: STRING(50),
            unique: true,
            validate: { isEmail: true, notEmpty: true },
        },
        passwordHash: {
            type: STRING,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);
