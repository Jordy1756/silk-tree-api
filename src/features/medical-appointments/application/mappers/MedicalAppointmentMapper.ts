import { MedicalAppointment } from "../../domain/entities/MedicalAppointment.ts";
import { MedicalAppointmentDTO } from "../dtos/MedicalAppointmentDTO.ts";
import { mapToSpecialtyDTO } from "./SpecialtyMapper.ts";

export const mapToMedicalAppointment = ({
    id,
    title,
    start: startDate,
    end: endDate,
    specialty: specialtyDTO,
}: MedicalAppointmentDTO) => MedicalAppointment.build({ id, title, startDate, endDate, specialtyId: specialtyDTO.id });

export const mapToMedicalAppointmentDTO = ({ id, title, startDate, endDate, specialty }: MedicalAppointment) =>
    new MedicalAppointmentDTO(id, title, startDate, endDate, mapToSpecialtyDTO(specialty));

export const mapToMedicalAppointmentDTOs = (medicalAppointments: MedicalAppointment[]) =>
    medicalAppointments.map((medicalAppointment) => mapToMedicalAppointmentDTO(medicalAppointment));
