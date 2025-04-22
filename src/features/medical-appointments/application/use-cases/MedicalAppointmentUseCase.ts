import { inject, injectable } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "../../infrastructure/container/MedicalAppointmentTypes";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
import { ConflictError, NotFoundError } from "../../../../shared/errors/errorClasses";

@injectable()
export class MedicalAppointmentUseCase {
    constructor(
        @inject(MEDICAL_APPOINTMENT_TYPES.IMedicalAppointmentRepository)
        private readonly _medicalAppointmentRepository: IMedicalAppointmentRepository
    ) {}

    async insertMedicalAppointment(medicalAppointment: MedicalAppointment) {
        if (await this._medicalAppointmentRepository.checkOverlappingMedicalAppointment(medicalAppointment))
            throw new ConflictError(
                "Horario ocupado",
                "Ya existe una cita médica programada para este horario de otro usuario"
            );

        return await this._medicalAppointmentRepository.insertMedicalAppointment(medicalAppointment);
    }

    async updateMedicalAppointment(medicalAppointment: MedicalAppointment) {
        const existingAppointment = await this._medicalAppointmentRepository.checkOverlappingMedicalAppointment(
            medicalAppointment
        );

        if (existingAppointment && existingAppointment.id !== medicalAppointment.id)
            throw new ConflictError(
                "Horario ocupado",
                "El horario seleccionado se solapa con otra cita médica  de otro usuario"
            );

        const affectedCount = await this._medicalAppointmentRepository.updateMedicalAppointment(medicalAppointment);

        if (affectedCount === 0)
            throw new NotFoundError("Cita no encontrada", "La cita médica que intentas actualizar no existe");

        return affectedCount;
    }

    async deleteMedicalAppointment(medicalAppointmentId: string, userId: string) {
        const affectedCount = await this._medicalAppointmentRepository.deleteMedicalAppointment(
            medicalAppointmentId,
            userId
        );

        if (affectedCount === 0)
            throw new NotFoundError("Cita no encontrada", "La cita médica que intentas eliminar no existe");

        return affectedCount;
    }

    async getAllMedicalAppointments(userId: string) {
        return await this._medicalAppointmentRepository.getAllMedicalAppointments(userId);
    }
}
