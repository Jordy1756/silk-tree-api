import { controller, httpGet, httpPost, interfaces, request, requestParam, response } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { UserDTO } from "../../application/dtos/UserDTO.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { mapToUser } from "../../application/mappers/UserMapper.ts";

@controller("/user")
export class UserController implements interfaces.Controller {
    constructor(@inject(UserUseCase) private readonly _userUseCase: UserUseCase) {}

    @httpPost("/register")
    async register(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const user = await this._userUseCase.register(mapToUser(userData));

            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    @httpGet("/findByEmail/:email")
    async findByEmail(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const { email } = req.params;
            const user = await this._userUseCase.findByEmail(email);

            if (user === null) throw new Error("El usuario no existe");

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}
