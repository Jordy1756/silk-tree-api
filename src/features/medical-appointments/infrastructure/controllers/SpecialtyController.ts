import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { SpecialtyUseCase } from "../../application/use-cases/SpecialtyUseCase.ts";
import { Request, Response } from "express";
import { mapToSpecialtyDTOs } from "../../application/mappers/SpecialtyMapper.ts";

@controller("/specialty")
export class SpecialtyController implements interfaces.Controller {
    constructor(@inject(SpecialtyUseCase) private readonly _specialtyUseCase: SpecialtyUseCase) {}

    @httpGet("/getAllSpecialties")
    async getAllMedicalAppointments(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const specialties = await this._specialtyUseCase.getAllSpecialties();
            res.status(200).json(mapToSpecialtyDTOs(specialties));
        } catch (error) {
            throw error;
        }
    }
}
