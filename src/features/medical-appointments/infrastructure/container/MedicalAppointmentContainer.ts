import { Container } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "./MedicalAppointmentTypes";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository";
import { MedicalAppointmentRepository } from "../repositories/MedicalAppointmentRepository";
import { ISpecialtyRepository } from "../../domain/interfaces/ISpecialtyRepository";
import { SpecialtyRepository } from "../repositories/SpecialtyRepository";
import { SpecialtyUseCase } from "../../application/use-cases/SpecialtyUseCase";
import "../controllers/MedicalAppointmentController";
import "../controllers/SpecialtyController";

export function configureMedicalAppointmentContainer(container: Container) {
    container
        .bind<IMedicalAppointmentRepository>(MEDICAL_APPOINTMENT_TYPES.IMedicalAppointmentRepository)
        .to(MedicalAppointmentRepository);
    container.bind(MedicalAppointmentUseCase).toSelf().inSingletonScope();

    container.bind<ISpecialtyRepository>(MEDICAL_APPOINTMENT_TYPES.ISpecialtyRepository).to(SpecialtyRepository);
    container.bind(SpecialtyUseCase).toSelf().inSingletonScope();

    return container;
}
