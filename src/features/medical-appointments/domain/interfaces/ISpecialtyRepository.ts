import { Specialty } from "../entities/Specialty.js";

export interface ISpecialtyRepository {
    getAllSpecialties(): Promise<Specialty[]>;
}
