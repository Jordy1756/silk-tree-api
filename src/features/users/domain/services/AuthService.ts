import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { User } from "../entities/User.ts";
import { IAuthService } from "../interfaces/IAuthService.ts";
import { SECRET_KEY, SALT_ROUNDS, REFRESH_SECRET_KEY } from "../../../../shared/config/environment.ts";
import { MAX_AGE_ACCESS_TOKEN_JWT, MAX_AGE_REFRESH_TOKEN_JWT } from "../../../../shared/constants/jwtConstants.ts";
import { NotFoundError, UnauthorizedError } from "../../../../shared/errors/errorClasses.ts";

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

    async getUserInfoFromGoogle(googleAccessToken: string): Promise<{
        sub: string;
        name: string;
        given_name: string;
        family_name: string;
        picture: string;
        email: string;
        email_verified: boolean;
    }> {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${googleAccessToken}`,
            },
        });

        if (!response.ok)
            throw new UnauthorizedError(
                "Error de autenticación",
                "Hubo un problema al conectar con Google. Por favor, intenta más tarde"
            );

        return await response.json();
    }
}
