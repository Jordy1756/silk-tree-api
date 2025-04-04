import { MedicalAppointment } from "../../domain/entities/MedicalAppointment.ts";
import { MedicalAppointmentDTO } from "../dtos/MedicalAppointmentDTO.ts";
import { mapToSpecialtyDTO } from "./SpecialtyMapper.ts";

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
