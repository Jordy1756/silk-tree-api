import { injectable } from "inversify";
import { Specialty } from "../../domain/entities/Specialty.js";
import { ISpecialtyRepository } from "../../domain/interfaces/ISpecialtyRepository.js";

@injectable()
export class SpecialtyRepository implements ISpecialtyRepository {
    async getAllSpecialties(): Promise<Specialty[]> {
        return await Specialty.findAll();
    }
}
