import { injectable } from "inversify";
import { Specialty } from "../../domain/entities/Specialty.ts";
import { ISpecialtyRepository } from "../../domain/interfaces/ISpecialtyRepository.ts";

@injectable()
export class SpecialtyRepository implements ISpecialtyRepository {
    async getAllSpecialties(): Promise<Specialty[]> {
        return await Specialty.findAll();
    }
}
