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
        specialtyId,
    }: MedicalAppointment): Promise<MedicalAppointment> {
        if (await this.checkOverlappingMedicalAppointment(specialtyId, startDate, endDate))
            throw new Error("Horario no disponible");

        return await MedicalAppointment.create({ title, startDate, endDate, specialtyId });
    }

    async updateMedicalAppointment({
        id,
        title,
        startDate,
        endDate,
        specialtyId,
    }: MedicalAppointment): Promise<Number> {
        if (await this.checkOverlappingMedicalAppointment(specialtyId, startDate, endDate))
            throw new Error("Horario no disponible");

        return (await MedicalAppointment.update({ title, startDate, endDate, specialtyId }, { where: { id } }))[0];
    }

    async deleteMedicalAppointment(medicalAppointmentId: string): Promise<number> {
        return await MedicalAppointment.destroy({ where: { id: medicalAppointmentId } });
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

    async getAllMedicalAppointments(): Promise<MedicalAppointment[]> {
        return await MedicalAppointment.findAll({
            include: [
                {
                    model: Specialty,
                    as: "specialty",
                },
            ],
        });
    }
}
