import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { User } from "../entities/User";
import { IAuthService } from "../interfaces/IAuthService";
import { SECRET_KEY, SALT_ROUNDS, REFRESH_SECRET_KEY, NODE_ENV } from "../../../../shared/config/environment";

@injectable()
export class AuthService implements IAuthService {
    constructor() {}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, +(SALT_ROUNDS || 10));
    }

    async validateCredentials(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    generateAccessToken(paylod: Object): string {
        if (!SECRET_KEY) throw new Error("SECRET_KEY environment variable is not defined");
        return jwt.sign(paylod, SECRET_KEY, { expiresIn: "1m" });
    }

    generateRefreshToken(paylod: Object): string {
        if (!REFRESH_SECRET_KEY) throw new Error("REFRESH_SECRET_KEY environment variable is not defined");
        return jwt.sign(paylod, REFRESH_SECRET_KEY, { expiresIn: "2m" });
    }

    generateTokens({ id, email }: User): { accessToken: string; refreshToken: string } {
        const paylod = { id, email };
        return { accessToken: this.generateAccessToken(paylod), refreshToken: this.generateRefreshToken(paylod) };
    }

    verifyRefreshToken(token: string): { id: string; email: string } {
        if (!REFRESH_SECRET_KEY) throw new Error("REFRESH_SECRET_KEY environment variable is not defined");

        return jwt.verify(token, REFRESH_SECRET_KEY) as { id: string; email: string };
    }
}
