import { inject } from "inversify";
import { Request, Response } from "express";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    request,
    response,
} from "inversify-express-utils";
import { MedicalAppointmentDTO } from "../../application/dtos/MedicalAppointmentDTO.ts";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase.ts";
import {
    mapToMedicalAppointment,
    mapToMedicalAppointmentDTOs,
} from "../../application/mappers/MedicalAppointmentMapper.ts";
import { authMiddleware } from "../../../../shared/middlewares/authMiddleware.ts";

@controller("/medicalAppointment")
export class MedicalAppointmentController implements interfaces.Controller {
    constructor(
        @inject(MedicalAppointmentUseCase) private readonly _medicalAppointmentUseCase: MedicalAppointmentUseCase
    ) {}

    @httpPost("/insertMedicalAppointment", authMiddleware)
    async insertMedicalAppointment(@request() req: Request, @response() res: Response): Promise<void> {
        const { user } = req.session;
        const medicalAppointmentData: MedicalAppointmentDTO = req.body;
        medicalAppointmentData.userId = user.id;

        try {
            const medicalAppointment = await this._medicalAppointmentUseCase.insertMedicalAppointment(
                mapToMedicalAppointment(medicalAppointmentData)
            );

            res.status(201).json(medicalAppointment);
        } catch (error) {
            throw error;
        }
    }

    @httpPut("/updateMedicalAppointment", authMiddleware)
    async updateMedicalAppointment(@request() req: Request, @response() res: Response): Promise<void> {
        const { user } = req.session;
        const medicalAppointmentData: MedicalAppointmentDTO = req.body;
        medicalAppointmentData.userId = user.id;

        try {
            const medicalAppointment = await this._medicalAppointmentUseCase.updateMedicalAppointment(
                mapToMedicalAppointment(medicalAppointmentData)
            );

            res.status(201).json(medicalAppointment);
        } catch (error) {
            throw error;
        }
    }

    @httpDelete("/deleteMedicalAppointment/:medicalAppointmentId", authMiddleware)
    async deleteMedicalAppointment(@request() req: Request, @response() res: Response): Promise<void> {
        const { medicalAppointmentId } = req.params;
        const { user } = req.session;

        try {
            res.status(200).json(
                await this._medicalAppointmentUseCase.deleteMedicalAppointment(medicalAppointmentId, user.id)
            );
        } catch (error) {
            throw error;
        }
    }

    @httpGet("/getAllMedicalAppointments", authMiddleware)
    async getAllMedicalAppointments(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const { user } = req.session;
            const medicalAppointments = await this._medicalAppointmentUseCase.getAllMedicalAppointments(user.id);
            res.status(200).json(mapToMedicalAppointmentDTOs(medicalAppointments));
        } catch (error) {
            throw error;
        }
    }
}
