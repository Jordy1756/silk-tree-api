import { injectable } from "inversify";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository";
import { Specialty } from "../../domain/entities/Specialty";

@injectable()
export class MedicalAppointmentRepository implements IMedicalAppointmentRepository {
    async insertMedicalAppointment({
        title,
        startDate,
        endDate,
        specialtyId,
    }: MedicalAppointment): Promise<MedicalAppointment> {
        return await MedicalAppointment.create({ title, startDate, endDate, specialtyId });
    }

    async updateMedicalAppointment({
        id,
        title,
        startDate,
        endDate,
        specialtyId,
    }: MedicalAppointment): Promise<Number> {
        return (await MedicalAppointment.update({ title, startDate, endDate, specialtyId }, { where: { id } }))[0];
    }

    async deleteMedicalAppointment(medicalAppointmentId: string): Promise<number> {
        return await MedicalAppointment.destroy({ where: { id: medicalAppointmentId } });
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
