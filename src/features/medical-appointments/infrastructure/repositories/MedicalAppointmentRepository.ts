import { injectable } from "inversify";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository";
import { Specialty } from "../../domain/entities/Specialty";
import { Op } from "sequelize";

@injectable()
export class MedicalAppointmentRepository implements IMedicalAppointmentRepository {
    async insertMedicalAppointment({
        title,
        startDate,
        endDate,
        userId,
        specialtyId,
    }: MedicalAppointment): Promise<MedicalAppointment> {
        if (await this.checkOverlappingMedicalAppointment(specialtyId, startDate, endDate))
            throw new Error("Horario no disponible");

        return await MedicalAppointment.create({ title, startDate, endDate, userId, specialtyId });
    }

    async updateMedicalAppointment({
        id,
        title,
        startDate,
        endDate,
        userId,
        specialtyId,
    }: MedicalAppointment): Promise<Number> {
        if (await this.checkOverlappingMedicalAppointment(specialtyId, startDate, endDate))
            throw new Error("Horario no disponible");

        return (
            await MedicalAppointment.update({ title, startDate, endDate, specialtyId }, { where: { id, userId } })
        )[0];
    }

    async deleteMedicalAppointment(medicalAppointmentId: string, userId: string): Promise<number> {
        return await MedicalAppointment.destroy({ where: { id: medicalAppointmentId, userId } });
    }

    async checkOverlappingMedicalAppointment(specialtyId: number, startDate: Date, endDate: Date) {
        return await MedicalAppointment.findOne({
            where: {
                specialtyId,
                [Op.or]: [
                    { startDate: { [Op.between]: [startDate, endDate] } },
                    { endDate: { [Op.between]: [startDate, endDate] } },
                ],
            },
        });
    }

    async getAllMedicalAppointments(userId: string): Promise<MedicalAppointment[]> {
        return await MedicalAppointment.findAll({
            where: {
                id: userId,
            },
            include: [
                {
                    model: Specialty,
                    as: "specialty",
                },
            ],
        });
    }
}
