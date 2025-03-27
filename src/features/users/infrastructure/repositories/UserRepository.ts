import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";

export class UserRepository implements IUserRepository {
    constructor(private readonly connection: Pool) {}

    register = async (user: User): Promise<User> => {
        const [result] = await this.connection.query(
            "INSERT INTO users (id, name, email, lastName, password_hash) VALUES (?, ?, ?, ?, ?)",
            [user.id, user.name, user.lastName, user.email, user.passwordHash]
        );

        return user;
    };

    findByEmail = async (email: string): Promise<User | null> => {
        const [rows]: any = await this.connection.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);

        if (rows.length === 0) return null;

        const userData = rows[0];
        return new User(userData.id, userData.name, userData.lastName, userData.email, userData.password_hash);
    };
}
