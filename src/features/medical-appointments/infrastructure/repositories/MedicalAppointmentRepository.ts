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
        const [affectedCount] = await MedicalAppointment.update(
            { title, startDate, endDate, specialtyId },
            { where: { id, userId } }
        );
        return affectedCount;
    }

    async deleteMedicalAppointment(medicalAppointmentId: string, userId: string): Promise<number> {
        return await MedicalAppointment.destroy({ where: { id: medicalAppointmentId, userId } });
    }

    async checkOverlappingMedicalAppointment({
        id,
        startDate,
        endDate,
        specialtyId,
    }: MedicalAppointment): Promise<MedicalAppointment | null> {
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
            where: { userId },
            include: [
                {
                    model: Specialty,
                    as: "specialty",
                },
            ],
        });
    }
}
