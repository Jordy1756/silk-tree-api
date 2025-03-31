import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { User } from "../entities/User";
import { IAuthService } from "../interfaces/IAuthService";
import { JWT_SECRET } from "../../../../shared/config/environment";

@injectable()
export class AuthService implements IAuthService {
    constructor() {}

    async validateCredentials(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    generateToken({ id, email }: User): string {
        if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not defined");

        const payload = { id, email };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    }
}
