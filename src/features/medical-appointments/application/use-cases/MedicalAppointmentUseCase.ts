import { inject, injectable } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "../../infrastructure/container/MedicalAppointmentTypes.ts";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository.ts";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment.ts";

@injectable()
export class MedicalAppointmentUseCase {
    constructor(
        @inject(MEDICAL_APPOINTMENT_TYPES.IMedicalAppointmentRepository)
        private readonly _medicalAppointmentRepository: IMedicalAppointmentRepository
    ) {}

    async insertMedicalAppointment(medicalAppointment: MedicalAppointment) {
        return await this._medicalAppointmentRepository.insertMedicalAppointment(medicalAppointment);
    }

    async updateMedicalAppointment(medicalAppointment: MedicalAppointment) {
        return await this._medicalAppointmentRepository.updateMedicalAppointment(medicalAppointment);
    }

    async deleteMedicalAppointment(medicalAppointmentId: string) {
        return await this._medicalAppointmentRepository.deleteMedicalAppointment(medicalAppointmentId);
    }

    async getAllMedicalAppointments() {
        return await this._medicalAppointmentRepository.getAllMedicalAppointments();
    }
}
