import { DataTypes, Model } from "sequelize";
import { Specialty } from "./Specialty.ts";
import { sequelize } from "../../../../shared/database/connection.ts";
import { User } from "../../../users/domain/entities/User.ts";

export class MedicalAppointment extends Model {
    declare id: string;
    declare title: string;
    declare startDate: Date;
    declare endDate: Date;
    declare specialtyId: number;
    declare userId: string;
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
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "USER_ID",
            },
            field: "USER_ID",
        },
    },
    {
        sequelize,
        modelName: "MedicalAppointment",
        tableName: "MEDICAL_APPOINTMENT",
        timestamps: false,
    }
);

Specialty.hasMany(MedicalAppointment, {
    foreignKey: "specialtyId",
    sourceKey: "id",
    as: "medicalAppointments",
});

User.hasMany(MedicalAppointment, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "medicalAppointments",
});

MedicalAppointment.belongsTo(Specialty, {
    foreignKey: "specialtyId",
    targetKey: "id",
    as: "specialty",
});

MedicalAppointment.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});
