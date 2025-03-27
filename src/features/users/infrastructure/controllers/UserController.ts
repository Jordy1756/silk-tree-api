import { Request, Response } from "express";
import { UserDTO } from "../../application/dtos/UserDTO.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { mapToUser } from "../../application/mappers/UserMapper.ts";

export class UserController {
    constructor(private readonly userUseCase: UserUseCase) {}

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData: UserDTO = req.body;
            const user = await this.userUseCase.register(mapToUser(userData));

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    findByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const email: string = req.body;
            const user = await this.userUseCase.findByEmail(email);

            if (user === null) throw new Error("El usuario no existe");

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
}
