import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { User } from "../../domain/entities/User.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/container/UserTypes.ts";

@injectable()
export class UserUseCase {
    constructor(
        @inject(USER_TYPES.IUserRepository)
        private readonly _userRepository: IUserRepository
    ) {}

    register = async ({ name, lastName, email, passwordHash: password }: User): Promise<User> => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(crypto.randomUUID(), name, lastName, email, hashedPassword);
        return this._userRepository.register(user);
    };

    findByEmail = async (email: string) => {
        return this._userRepository.findByEmail(email);
    };
}
