import { inject, injectable } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "../../infrastructure/container/MedicalAppointmentTypes.js";
import { ISpecialtyRepository } from "../../domain/interfaces/ISpecialtyRepository.js";

@injectable()
export class SpecialtyUseCase {
    constructor(
        @inject(MEDICAL_APPOINTMENT_TYPES.ISpecialtyRepository)
        private readonly _specialtyRepository: ISpecialtyRepository
    ) {}

    async getAllSpecialties() {
        return await this._specialtyRepository.getAllSpecialties();
    }
}
