import { Specialty } from "../entities/Specialty.ts";

export interface ISpecialtyRepository {
    getAllSpecialties(): Promise<Specialty[]>;
}
