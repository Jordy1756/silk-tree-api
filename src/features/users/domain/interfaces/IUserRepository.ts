import { User } from "../entities/User";

export interface IUserRepository {
    regiter(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
