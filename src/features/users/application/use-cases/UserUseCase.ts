import { User } from "../../domain/entities/User.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/container/UserTypes.ts";
import { IAuthService } from "../../domain/interfaces/IAuthService.ts";
import { NotFoundError, UnauthorizedError } from "../../../../shared/errors/errorClasses.ts";

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

        if (!user) throw new NotFoundError("Usuario no encontrado");

        const isValid = await this._authService.validateCredentials(passwordHash, user.passwordHash);

        if (!isValid) throw new UnauthorizedError("Credenciales inválidas");

        const { accessToken, refreshToken } = this._authService.generateTokens(user);

        return { accessToken, refreshToken, user };
    }

    async refreshTokens(refreshToken: string) {
        const { id } = this._authService.verifyRefreshToken(refreshToken);

        const user = await this._userRepository.findById(id);

        if (!user) throw new NotFoundError("Usuario no encontrado");

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = this._authService.generateTokens(user);

        return { newAccessToken, newRefreshToken };
    }
}
