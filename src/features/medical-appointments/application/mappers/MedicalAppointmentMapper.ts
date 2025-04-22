import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
import { MedicalAppointmentDTO } from "../dtos/MedicalAppointmentDTO";
import { mapToSpecialtyDTO } from "./SpecialtyMapper";

export const mapToMedicalAppointment = ({
    id,
    title,
    start: startDate,
    end: endDate,
    userId,
    specialty: specialtyDTO,
}: MedicalAppointmentDTO) =>
    MedicalAppointment.build({ id, title, startDate, endDate, userId, specialtyId: specialtyDTO.id });

export const mapToMedicalAppointmentDTO = ({ id, title, startDate, endDate, userId, specialty }: MedicalAppointment) =>
    new MedicalAppointmentDTO(id, title, startDate, endDate, userId, mapToSpecialtyDTO(specialty));

export const mapToMedicalAppointmentDTOs = (medicalAppointments: MedicalAppointment[]) =>
    medicalAppointments.map((medicalAppointment) => mapToMedicalAppointmentDTO(medicalAppointment));
