import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserDTO } from "../dtos/UserDTO";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    execute = async ({ name, lastName, email, password }: UserDTO): Promise<User> => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(crypto.randomUUID(), name, lastName, email, hashedPassword);
        return this.userRepository.regiter(user);
    };
}
