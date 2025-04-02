import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/database/connection.ts";
import { MedicalAppointment } from "./MedicalAppointment.ts";

export class Specialty extends Model {
    declare id: number;
    declare name: string;
}

Specialty.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "SPECIALTY_ID",
        },
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: { notEmpty: true },
            field: "NAME",
        },
    },
    {
        sequelize,
        modelName: "Specialty",
        tableName: "SPECIALTY",
        timestamps: false,
    }
);
