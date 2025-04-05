import { inject, injectable } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "../../infrastructure/container/MedicalAppointmentTypes.ts";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository.ts";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment.ts";
import { ValidationError } from "../../../../shared/errors/errorClasses.ts";

@injectable()
export class MedicalAppointmentUseCase {
    constructor(
        @inject(MEDICAL_APPOINTMENT_TYPES.IMedicalAppointmentRepository)
        private readonly _medicalAppointmentRepository: IMedicalAppointmentRepository
    ) {}

    async insertMedicalAppointment(medicalAppointment: MedicalAppointment) {
        if (await this._medicalAppointmentRepository.checkOverlappingMedicalAppointment(medicalAppointment))
            throw new ValidationError("Horario no disponible");

        return await this._medicalAppointmentRepository.insertMedicalAppointment(medicalAppointment);
    }

    async updateMedicalAppointment(medicalAppointment: MedicalAppointment) {
        if (await this._medicalAppointmentRepository.checkOverlappingMedicalAppointment(medicalAppointment))
            throw new ValidationError("Horario no disponible");

        return await this._medicalAppointmentRepository.updateMedicalAppointment(medicalAppointment);
    }

    async deleteMedicalAppointment(medicalAppointmentId: string, userId: string) {
        return await this._medicalAppointmentRepository.deleteMedicalAppointment(medicalAppointmentId, userId);
    }

    async getAllMedicalAppointments(userId: string) {
        return await this._medicalAppointmentRepository.getAllMedicalAppointments(userId);
    }
}
