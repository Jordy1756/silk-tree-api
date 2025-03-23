import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserDTO } from "../dtos/UserDTO";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

export class ManageUser {
    constructor(private userRepository: IUserRepository) {}

    async create({ name, lastName, email, password }: UserDTO): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(crypto.randomUUID(), name, lastName, email, hashedPassword);
        return this.userRepository.create(user);
    }
}
