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
import { MedicalAppointmentDTO } from "../../application/dtos/MedicalAppointmentDTO";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase";
import {
    mapToMedicalAppointment,
    mapToMedicalAppointmentDTOs,
} from "../../application/mappers/MedicalAppointmentMapper";
import { authMiddleware } from "../../../../shared/middlewares/authMiddleware";

@controller("/medical-appointment")
export class MedicalAppointmentController implements interfaces.Controller {
    constructor(
        @inject(MedicalAppointmentUseCase) private readonly _medicalAppointmentUseCase: MedicalAppointmentUseCase
    ) {}

    @httpPost("/insert-medical-appointment", authMiddleware)
    async insertMedicalAppointment(@request() req: Request, @response() res: Response): Promise<void> {
        const { id } = req.session.user;
        const medicalAppointmentData: MedicalAppointmentDTO = req.body;
        medicalAppointmentData.userId = id;

        try {
            const medicalAppointment = await this._medicalAppointmentUseCase.insertMedicalAppointment(
                mapToMedicalAppointment(medicalAppointmentData)
            );

            res.status(201).json(medicalAppointment);
        } catch (error) {
            throw error;
        }
    }

    @httpPut("/update-medical-appointment", authMiddleware)
    async updateMedicalAppointment(@request() req: Request, @response() res: Response): Promise<void> {
        const { id } = req.session.user;
        const medicalAppointmentData: MedicalAppointmentDTO = req.body;
        medicalAppointmentData.userId = id;

        try {
            const medicalAppointment = await this._medicalAppointmentUseCase.updateMedicalAppointment(
                mapToMedicalAppointment(medicalAppointmentData)
            );

            res.status(201).json(medicalAppointment);
        } catch (error) {
            throw error;
        }
    }

    @httpDelete("/delete-medical-appointment/:medicalAppointmentId", authMiddleware)
    async deleteMedicalAppointment(@request() req: Request, @response() res: Response): Promise<void> {
        const { medicalAppointmentId } = req.params;
        const { id } = req.session.user;

        try {
            res.status(200).json(
                await this._medicalAppointmentUseCase.deleteMedicalAppointment(medicalAppointmentId, id)
            );
        } catch (error) {
            throw error;
        }
    }

    @httpGet("/get-all-medical-appointments", authMiddleware)
    async getAllMedicalAppointments(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const { id } = req.session.user;
            const medicalAppointments = await this._medicalAppointmentUseCase.getAllMedicalAppointments(id);
            res.status(200).json(mapToMedicalAppointmentDTOs(medicalAppointments));
        } catch (error) {
            throw error;
        }
    }
}
