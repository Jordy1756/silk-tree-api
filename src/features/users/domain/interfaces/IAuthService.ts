import { User } from "../entities/User";

export interface IAuthService {
    validateCredentials(password: string, hash: string): Promise<boolean>;
    generateToken(user: User): string;
}
