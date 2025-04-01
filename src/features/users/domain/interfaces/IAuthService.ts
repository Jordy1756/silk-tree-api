import { User } from "../entities/User";

export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    validateCredentials(password: string, hash: string): Promise<boolean>;
    generateToken(user: User): string;
    // refreshToken(): void
}
