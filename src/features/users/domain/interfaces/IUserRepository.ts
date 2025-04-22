import { User } from "../entities/User.js";

export interface IUserRepository {
    register(user: User): Promise<User>;
    login(email: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
