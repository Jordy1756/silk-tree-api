import { User } from "../entities/User.ts";

export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    validateCredentials(password: string, hash: string): Promise<boolean>;
    generateTokens({ id, email }: User): { accessToken: string; refreshToken: string };
    getUserInfoFromGoogle(googleAccessToken: string): Promise<{
        sub: string;
        name: string;
        given_name: string;
        family_name: string;
        picture: string;
        email: string;
        email_verified: boolean;
    }>;
}
