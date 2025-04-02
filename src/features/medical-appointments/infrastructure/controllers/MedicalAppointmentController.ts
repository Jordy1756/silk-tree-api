import { inject } from "inversify";
import { Request, Response } from "express";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import { MedicalAppointmentDTO } from "../../application/dtos/MedicalAppointmentDTO";
import { MedicalAppointmentUseCase } from "../../application/use-cases/MedicalAppointmentUseCase";
import { mapToMedicalAppointment } from "../../application/mappers/MedicalAppointmentMapper";

@controller("/medicalAppointment")
export class MedicalAppointmentController implements interfaces.Controller {
    constructor(
        @inject(MedicalAppointmentUseCase) private readonly _medicalAppointmentUseCase: MedicalAppointmentUseCase
    ) {}

    @httpPost("/insertMedicalAppointment")
    async re(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const medicalAppointmentData: MedicalAppointmentDTO = req.body;
            console.log({ medicalAppointmentData });

            const medicalAppointment = this._medicalAppointmentUseCase.insertMedicalAppointment(
                mapToMedicalAppointment(medicalAppointmentData)
            );

            res.status(200).json(medicalAppointment);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}
