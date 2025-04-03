import { User } from "../entities/User";

export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    validateCredentials(password: string, hash: string): Promise<boolean>;
    generateTokens({ id, email }: User): { accessToken: string; refreshToken: string };
}
