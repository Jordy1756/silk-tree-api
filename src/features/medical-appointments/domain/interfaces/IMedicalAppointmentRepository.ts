import { MedicalAppointment } from "../entities/MedicalAppointment";

export interface IMedicalAppointmentRepository {
    insertMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<MedicalAppointment>;
    updateMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<Number>;
    deleteMedicalAppointment(medicalAppointmentId: string): Promise<number>;
    checkOverlappingMedicalAppointment(
        specialtyId: number,
        startDate: Date,
        endDate: Date
    ): Promise<MedicalAppointment | null>;
    getAllMedicalAppointments(): Promise<MedicalAppointment[]>;
}
