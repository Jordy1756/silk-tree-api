import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { User } from "../entities/User";
import { IAuthService } from "../interfaces/IAuthService";
import { JWT_SECRET, SALT_ROUNDS } from "../../../../shared/config/environment";

@injectable()
export class AuthService implements IAuthService {
    constructor() {}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, +(SALT_ROUNDS || 10));
    }

    async validateCredentials(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    generateToken({ id, email }: User): string {
        if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not defined");
        const paylod = { id, email };
        return jwt.sign(paylod, JWT_SECRET, { expiresIn: "24h" });
    }
}
