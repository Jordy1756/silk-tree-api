import { MedicalAppointment } from "../entities/MedicalAppointment.ts";

export interface IMedicalAppointmentRepository {
    insertMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<MedicalAppointment>;
    updateMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<Number>;
    deleteMedicalAppointment(medicalAppointmentId: string, userId: string): Promise<number>;
    checkOverlappingMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<MedicalAppointment | null>;
    getAllMedicalAppointments(userId: string): Promise<MedicalAppointment[]>;
}
