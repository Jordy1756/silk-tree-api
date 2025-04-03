import { Container } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "./MedicalAppointmentTypes.ts";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase.ts";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository.ts";
import { MedicalAppointmentRepository } from "../repositories/MedicalAppointmentRepository.ts";
import { ISpecialtyRepository } from "../../domain/interfaces/ISpecialtyRepository.ts";
import { SpecialtyRepository } from "../repositories/SpecialtyRepository.ts";
import { SpecialtyUseCase } from "../../application/use-cases/SpecialtyUseCase.ts";
import "../controllers/MedicalAppointmentController.ts";
import "../controllers/SpecialtyController.ts";

export function configureMedicalAppointmentContainer(container: Container) {
    container
        .bind<IMedicalAppointmentRepository>(MEDICAL_APPOINTMENT_TYPES.IMedicalAppointmentRepository)
        .to(MedicalAppointmentRepository);
    container.bind(MedicalAppointmentUseCase).toSelf().inSingletonScope();

    container.bind<ISpecialtyRepository>(MEDICAL_APPOINTMENT_TYPES.ISpecialtyRepository).to(SpecialtyRepository);
    container.bind(SpecialtyUseCase).toSelf().inSingletonScope();

    return container;
}
