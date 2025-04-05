import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { User } from "../entities/User.ts";
import { IAuthService } from "../interfaces/IAuthService.ts";
import { SECRET_KEY, SALT_ROUNDS, REFRESH_SECRET_KEY } from "../../../../shared/config/environment.ts";

@injectable()
export class AuthService implements IAuthService {
    constructor() {}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, +SALT_ROUNDS);
    }

    async validateCredentials(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    generateAccessToken(paylod: Object): string {
        return jwt.sign(paylod, SECRET_KEY, { expiresIn: "1m" });
    }

    generateRefreshToken(paylod: Object): string {
        return jwt.sign(paylod, REFRESH_SECRET_KEY, { expiresIn: "2m" });
    }

    generateTokens({ id, email }: User): { accessToken: string; refreshToken: string } {
        const paylod = { id, email };
        return { accessToken: this.generateAccessToken(paylod), refreshToken: this.generateRefreshToken(paylod) };
    }

    verifyRefreshToken(token: string): { id: string; email: string } {
        return jwt.verify(token, REFRESH_SECRET_KEY) as { id: string; email: string };
    }
}
