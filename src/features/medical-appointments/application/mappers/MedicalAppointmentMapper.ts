import { MedicalAppointment } from "../../domain/entities/MedicalAppointment.ts";
import { MedicalAppointmentDTO } from "../dtos/MedicalAppointmentDTO.ts";
import { mapToSpecialty, mapToSpecialtyDTO } from "./SpecialtyDTO.ts";

export const mapToMedicalAppointment = ({
    id,
    title,
    start: startDate,
    end: endDate,
    specialty: specialtyDTO,
}: MedicalAppointmentDTO) =>
    MedicalAppointment.build({ id, title, startDate, endDate, specialty: mapToSpecialty(specialtyDTO) });

export const mapToMedicalAppointmentDTO = ({ id, title, startDate, endDate, specialty }: MedicalAppointment) =>
    new MedicalAppointmentDTO(id, title, startDate, endDate, mapToSpecialtyDTO(specialty));
