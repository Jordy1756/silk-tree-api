import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { User } from "../../domain/entities/User.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { injectable } from "inversify";

@injectable()
export class UserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    register = async ({ name, lastName, email, passwordHash: password }: User): Promise<User> => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(crypto.randomUUID(), name, lastName, email, hashedPassword);
        return this.userRepository.register(user);
    };

    findByEmail = async (email: string) => {
        return this.userRepository.findByEmail(email);
    };
}
