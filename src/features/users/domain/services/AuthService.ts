import { injectable } from "inversify";
import { User } from "../entities/User";
import { IAuthService } from "../interfaces/IAuthService";

@injectable()
export class AuthService implements IAuthService {
    constructor() {}

    validateCredentials(password: string, hash: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    generateToken(user: User): string {
        throw new Error("Method not implemented.");
    }
}
