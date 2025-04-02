import { DataTypes, Deferrable, Model } from "sequelize";
import { Specialty } from "./Specialty.ts";
import { sequelize } from "../../../../shared/database/connection.ts";

export class MedicalAppointment extends Model {
    declare id: string;
    declare title: string;
    declare startDate: Date;
    declare endDate: Date;
    declare specialty: Specialty;
}

MedicalAppointment.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "MEDICAL_APPOINTMENT_ID",
        },
        title: {
            type: DataTypes.STRING(50),
            validate: { notEmpty: true },
            field: "TITLE",
        },
        startDate: {
            type: DataTypes.DATE,
            validate: { notEmpty: true, isDate: true },
            field: "START_DATE",
        },
        endDate: {
            type: DataTypes.DATE,
            validate: { notEmpty: true, isDate: true },
            field: "END_DATE",
        },
        specialtyId: {
            type: DataTypes.INTEGER,
            references: {
                model: Specialty,
                key: "SPECIALTY_ID",
            },
            field: "SPECIALTY_ID",
        },
    },
    {
        sequelize,
        modelName: "MedicalAppointment",
        tableName: "MEDICAL_APPOINTMENT",
        timestamps: false,
    }
);
