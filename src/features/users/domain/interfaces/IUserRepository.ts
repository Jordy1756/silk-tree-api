import { User } from "../entities/User.ts";

export interface IUserRepository {
    register(user: User): Promise<User>;
    login(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
