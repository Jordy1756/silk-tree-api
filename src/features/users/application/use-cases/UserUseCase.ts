import bcrypt from "bcrypt";
import { User } from "../../domain/entities/User.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/container/UserTypes.ts";

@injectable()
export class UserUseCase {
    constructor(@inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository) {}

    async register({ name, lastName, email, passwordHash: password }: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.build({ name, lastName, email, passwordHash: hashedPassword });
        return await this._userRepository.register(user);
    }

    async findByEmail(email: string) {
        return await this._userRepository.findByEmail(email);
    }
}
