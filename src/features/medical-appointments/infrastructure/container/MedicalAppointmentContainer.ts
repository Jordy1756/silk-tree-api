import { Container } from "inversify";
import { MEDICAL_APPOINTMENT_TYPES } from "./MedicalAppointmentTypes.ts";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase.ts";
import { IMedicalAppointmentRepository } from "../../domain/interfaces/IMedicalAppointmentRepository.ts";
import { MedicalAppointmentRepository } from "../repositories/MedicalAppointmentRepository.ts";
import "../controllers/MedicalAppointmentController.ts";

export function configureMedicalAppointmentContainer(container: Container) {
    container
        .bind<IMedicalAppointmentRepository>(MEDICAL_APPOINTMENT_TYPES.IMedicalAppointmentRepository)
        .to(MedicalAppointmentRepository);
    container.bind(MedicalAppointmentUseCase).toSelf().inSingletonScope();

    return container;
}
