import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
    async register({ name, lastName, email, passwordHash }: User): Promise<User> {
        return await User.create({ name, lastName, email, passwordHash });
    }

    async login(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }
}
