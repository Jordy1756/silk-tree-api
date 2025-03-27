import { controller, httpGet, httpPost } from "inversify-express-utils";
import { Request, Response } from "express";
import { UserDTO } from "../../application/dtos/UserDTO.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { mapToUser } from "../../application/mappers/UserMapper.ts";
import { inject } from "inversify";

@controller("/user")
export class UserController {
    constructor(@inject("UserUseCase") private readonly _userUseCase: UserUseCase) {}

    @httpPost("/register")
    async register(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const user = await this._userUseCase.register(mapToUser(userData));

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    findByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const email: string = req.body;
            const user = await this._userUseCase.findByEmail(email);

            if (user === null) throw new Error("El usuario no existe");

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
}
