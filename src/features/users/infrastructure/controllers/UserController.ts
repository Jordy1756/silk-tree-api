import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { UserDTO } from "../../application/dtos/UserDTO.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { mapToUser } from "../../application/mappers/UserMapper.ts";
import { NODE_ENV } from "../../../../shared/config/environment.ts";

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

    @httpPost("/login")
    async login(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const { accessToken, user } = await this._userUseCase.login(mapToUser(userData));

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "strict",
            });

            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}
