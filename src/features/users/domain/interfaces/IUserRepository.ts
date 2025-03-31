import { User } from "../entities/User.ts";

export interface IUserRepository {
    register(user: User): Promise<User>;
    login(user: User): Promise<User | null>;
}
