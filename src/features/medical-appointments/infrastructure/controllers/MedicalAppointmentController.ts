import { inject } from "inversify";
import { Request, Response } from "express";
import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import { MedicalAppointmentDTO } from "../../application/dtos/MedicalAppointmentDTO.ts";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase.ts";
import {
    mapToMedicalAppointment,
    mapToMedicalAppointmentDTOs,
} from "../../application/mappers/MedicalAppointmentMapper.ts";

@controller("/medicalAppointment")
export class MedicalAppointmentController implements interfaces.Controller {
    constructor(
        @inject(MedicalAppointmentUseCase) private readonly _medicalAppointmentUseCase: MedicalAppointmentUseCase
    ) {}

    @httpPost("/insertMedicalAppointment")
    async insertMedicalAppointment(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const medicalAppointmentData: MedicalAppointmentDTO = req.body;

            const medicalAppointment = await this._medicalAppointmentUseCase.insertMedicalAppointment(
                mapToMedicalAppointment(medicalAppointmentData)
            );

            res.status(200).json(medicalAppointment);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    @httpGet("/getAllMedicalAppointments")
    async getAllMedicalAppointments(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const medicalAppointments = await this._medicalAppointmentUseCase.getAllMedicalAppointments();
            res.status(200).json(mapToMedicalAppointmentDTOs(medicalAppointments));
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}
