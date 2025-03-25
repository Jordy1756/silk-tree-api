import { User } from "../../domain/entities/User";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserDTO } from "../dtos/UserDTO";

export class LoginUseCase {
    constructor(private userRepository: IUserRepository, private authService: IAuthService) {}

    async execute({ email, password }: UserDTO): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new Error("INVALID_CREDENTIALS");

        const isValid = await this.authService.validateCredentials(password, user.passwordHash);

        if (!isValid) throw new Error("INVALID_CREDENTIALS");

        const token = this.authService.generateToken(user);

        return { user, token };
    }
}
