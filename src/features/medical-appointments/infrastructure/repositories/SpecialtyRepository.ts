import { injectable } from "inversify";
import { Specialty } from "../../domain/entities/Specialty";
import { ISpecialtyRepository } from "../../domain/interfaces/ISpecialtyRepository";

@injectable()
export class SpecialtyRepository implements ISpecialtyRepository {
    async getAllSpecialties(): Promise<Specialty[]> {
        return await Specialty.findAll();
    }
}
