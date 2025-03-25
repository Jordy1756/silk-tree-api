import { UserDTO } from "../../application/dtos/UserDTO";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { Request, Response } from "express";

export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase, private loginUseCase: LoginUseCase) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const user = await this.createUserUseCase.execute(userData);

            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        } catch (error) {
            if (error.message === "USER_ALREADY_EXISTS") {
                res.status(409).json({ error: "User already exists" });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const credentials: UserDTO = req.body;
            const { user, token } = await this.loginUseCase.execute(credentials);

            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token,
            });
        } catch (error) {
            if (error.message === "INVALID_CREDENTIALS") {
                res.status(401).json({ error: "Invalid credentials" });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}
