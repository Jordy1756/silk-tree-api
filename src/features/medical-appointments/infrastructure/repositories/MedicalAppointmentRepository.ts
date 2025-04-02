import { injectable } from "inversify";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository";

@injectable()
export class MedicalAppointmentRepository implements IMedicalAppointmentRepository {
    async insertMedicalAppointment({
        id,
        title,
        startDate,
        endDate,
        specialty,
    }: MedicalAppointment): Promise<MedicalAppointment> {
        return await MedicalAppointment.create({ id, title, startDate, endDate, specialtyId: specialty.id });
    }

    async updateMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<MedicalAppointment> {
        throw new Error("Method not implemented.");
    }

    async deleteMedicalAppointment(medicalAppointmentId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
