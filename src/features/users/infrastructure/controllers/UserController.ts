import { UserDTO } from "../../application/dtos/UserDTO";
import { ManageUser } from "../../application/use-cases/ManageUser";
import { Request, Response } from "express";

export class UserController {
    constructor(private ManageUser: ManageUser) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const user = await this.ManageUser.create(userData);

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
}
