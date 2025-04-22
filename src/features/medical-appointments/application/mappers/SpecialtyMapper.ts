import { Specialty } from "../../domain/entities/Specialty";
import { SpecialtyDTO } from "../dtos/SpecialtyDTO";

export const mapToSpecialty = ({ id, name }: SpecialtyDTO) => Specialty.build({ id, name });

export const mapToSpecialtyDTO = ({ id, name }: Specialty) => new SpecialtyDTO(id, name);

export const mapToSpecialtyDTOs = (specialties: Specialty[]) =>
    specialties.map((specialty) => mapToSpecialtyDTO(specialty));
