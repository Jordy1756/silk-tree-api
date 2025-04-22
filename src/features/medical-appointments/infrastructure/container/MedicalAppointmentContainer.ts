import { Container } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "./MedicalAppointmentTypes.js";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase.js";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository.js";
import { MedicalAppointmentRepository } from "../repositories/MedicalAppointmentRepository.js";
import { ISpecialtyRepository } from "../../domain/interfaces/ISpecialtyRepository.js";
import { SpecialtyRepository } from "../repositories/SpecialtyRepository.js";
import { SpecialtyUseCase } from "../../application/use-cases/SpecialtyUseCase.js";
import "../controllers/MedicalAppointmentController.js";
import "../controllers/SpecialtyController.js";

export function configureMedicalAppointmentContainer(container: Container) {
    container
        .bind<IMedicalAppointmentRepository>(MEDICAL_APPOINTMENT_TYPES.IMedicalAppointmentRepository)
        .to(MedicalAppointmentRepository);
    container.bind(MedicalAppointmentUseCase).toSelf().inSingletonScope();

    container.bind<ISpecialtyRepository>(MEDICAL_APPOINTMENT_TYPES.ISpecialtyRepository).to(SpecialtyRepository);
    container.bind(SpecialtyUseCase).toSelf().inSingletonScope();

    return container;
}
