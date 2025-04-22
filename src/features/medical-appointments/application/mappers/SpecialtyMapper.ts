import { Specialty } from "../../domain/entities/Specialty.js";
import { SpecialtyDTO } from "../dtos/SpecialtyDTO.js";

export const mapToSpecialty = ({ id, name }: SpecialtyDTO) => Specialty.build({ id, name });

export const mapToSpecialtyDTO = ({ id, name }: Specialty) => new SpecialtyDTO(id, name);

export const mapToSpecialtyDTOs = (specialties: Specialty[]) =>
    specialties.map((specialty) => mapToSpecialtyDTO(specialty));
