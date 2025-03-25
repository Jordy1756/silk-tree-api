import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { connection } from "../../../../shared/database/connection";

export class UserRepository implements IUserRepository {
    async regiter(user: User): Promise<User> {
        const [result] = await connection.query(
            "INSERT INTO users (id, name, email, lastName, password_hash) VALUES (?, ?, ?, ?, ?)",
            [user.id, user.name, user.lastName, user.email, user.passwordHash]
        );

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const [rows]: any = await connection.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);

        if (rows.length === 0) return null;

        const userData = rows[0];
        return new User(userData.id, userData.name, userData.lastName, userData.email, userData.password_hash);
    }
}
