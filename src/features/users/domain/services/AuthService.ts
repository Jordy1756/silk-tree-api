import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IAuthService } from "../interfaces/IAuthService";
import { User } from "../entities/User";

export class AuthService implements IAuthService {
    constructor(private secretKey: string) {}

    validateCredentials = (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);

    generateToken = ({ id, email }: User): string =>
        jwt.sign({ userId: id, email }, this.secretKey, { expiresIn: "1h" });
}
