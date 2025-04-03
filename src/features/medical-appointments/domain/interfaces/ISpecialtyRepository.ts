import { Specialty } from "../entities/Specialty";

export interface ISpecialtyRepository {
    getAllSpecialties(): Promise<Specialty[]>;
}
