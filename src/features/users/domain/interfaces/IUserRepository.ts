import { User } from "../entities/User.ts";

export interface IUserRepository {
    register(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
