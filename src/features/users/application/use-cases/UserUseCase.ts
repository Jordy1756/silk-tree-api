import { User } from "../../domain/entities/User.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/container/UserTypes.ts";
import { IAuthService } from "../../domain/interfaces/IAuthService.ts";

@injectable()
export class UserUseCase {
    constructor(
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(USER_TYPES.IAuthService) private readonly _authService: IAuthService
    ) {}

    async register({ name, lastName, email, passwordHash: password }: User): Promise<User> {
        const hashedPassword = await this._authService.hashPassword(password);
        const user = User.build({ name, lastName, email, passwordHash: hashedPassword });
        return await this._userRepository.register(user);
    }

    async login({ email, passwordHash }: User) {
        const user = await this._userRepository.login(email);

        if (!user) throw new Error("Credenciales inválidas");

        const isValid = await this._authService.validateCredentials(passwordHash, user.passwordHash);

        if (!isValid) throw new Error("Credenciales inválidas");

        const { accessToken, refreshToken } = this._authService.generateTokens(user);

        return { accessToken, refreshToken, user };
    }
}
