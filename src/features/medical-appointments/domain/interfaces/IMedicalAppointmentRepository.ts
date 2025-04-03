import { MedicalAppointment } from "../entities/MedicalAppointment";

export interface IMedicalAppointmentRepository {
    insertMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<MedicalAppointment>;
    updateMedicalAppointment(medicalAppointment: MedicalAppointment): Promise<Number>;
    deleteMedicalAppointment(medicalAppointmentId: string): Promise<number>;
    getAllMedicalAppointments(): Promise<MedicalAppointment[]>;
}
