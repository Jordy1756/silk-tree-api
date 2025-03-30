import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
    register = async ({ name, lastName, email, passwordHash }: User): Promise<User> => {
        return await User.create({ name, lastName, email, passwordHash });;
    };

    findByEmail = async (email: string): Promise<User | null> => {
        return await User.findOne({ where: { email } });
    };
}
