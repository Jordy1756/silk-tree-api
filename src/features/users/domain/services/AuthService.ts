import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { User } from "../entities/User.ts";
import { IAuthService } from "../interfaces/IAuthService.ts";
import { SECRET_KEY, SALT_ROUNDS, REFRESH_SECRET_KEY } from "../../../../shared/config/environment.ts";
import { MAX_AGE_ACCESS_TOKEN_JWT, MAX_AGE_REFRESH_TOKEN_JWT } from "../../../../shared/constants/jwtConstants.ts";

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
        return jwt.sign(paylod, SECRET_KEY, { expiresIn: MAX_AGE_ACCESS_TOKEN_JWT });
    }

    generateRefreshToken(paylod: Object): string {
        return jwt.sign(paylod, REFRESH_SECRET_KEY, { expiresIn: MAX_AGE_REFRESH_TOKEN_JWT });
    }

    generateTokens({ id, email }: User): { accessToken: string; refreshToken: string } {
        const paylod = { id, email };
        return { accessToken: this.generateAccessToken(paylod), refreshToken: this.generateRefreshToken(paylod) };
    }
}
