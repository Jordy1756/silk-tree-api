import { User } from "../../domain/entities/User.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/container/UserTypes.ts";
import { IAuthService } from "../../domain/interfaces/IAuthService.ts";
import { ConflictError, UnauthorizedError, ValidationError } from "../../../../shared/errors/errorClasses.ts";

@injectable()
export class UserUseCase {
    constructor(
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(USER_TYPES.IAuthService) private readonly _authService: IAuthService
    ) {}

    async register({ name, lastName, email, passwordHash: password }: User): Promise<User> {
        const existingUser = await this._userRepository.findByEmail(email);

        if (existingUser)
            throw new ConflictError("Email en uso", "Ya existe una cuenta registrada con este correo electrónico");

        const hashedPassword = await this._authService.hashPassword(password);
        const user = User.build({ name, lastName, email, passwordHash: hashedPassword });

        return await this._userRepository.register(user);
    }

    async login({ email, passwordHash }: User) {
        const user = await this._userRepository.login(email);

        if (!user) throw new ValidationError("Credenciales incorrectas", "El email o la contraseña son incorrectos");

        const isCredentialsValid = await this._authService.validateCredentials(passwordHash, user.passwordHash);

        if (!isCredentialsValid)
            throw new ValidationError("Credenciales incorrectas", "El email o la contraseña son incorrectos");

        const { accessToken, refreshToken } = this._authService.generateTokens(user);

        return { accessToken, refreshToken, user };
    }
}
