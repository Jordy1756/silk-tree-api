import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/database/connection.ts";

export class Specialty extends Model {
    declare id: string;
    declare name: string;
}

Specialty.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize,
        modelName: "Specialty",
    }
);
