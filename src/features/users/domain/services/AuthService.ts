import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IAuthService } from "../interfaces/IAuthService";
import { User } from "../entities/User";

export class AuthService implements IAuthService {
    constructor(private secretKey: string) {}

    async validateCredentials(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    generateToken({ id, email }: User): string {
        return jwt.sign({ userId: id, email }, this.secretKey, { expiresIn: "1h" });
    }
}
