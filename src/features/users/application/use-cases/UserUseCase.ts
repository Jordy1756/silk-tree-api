import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/container/UserTypes";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { ConflictError, ValidationError } from "../../../../shared/errors/errorClasses";

@injectable()
export class UserUseCase {
    constructor(
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(USER_TYPES.IAuthService) private readonly _authService: IAuthService
    ) {}

    async register({ name, lastName, email, passwordHash: password }: User): Promise<User> {
        const existingUser = await this._userRepository.findByEmail(email);

        if (existingUser)
            throw new ConflictError("Correo en uso", "Ya existe una cuenta registrada con este correo electrónico");

        const hashedPassword = await this._authService.hashPassword(password);
        const user = User.build({ name, lastName, email, passwordHash: hashedPassword });

        return await this._userRepository.register(user);
    }

    async registerWithGoogle(googleAccessToken: string): Promise<User> {
        const { given_name, family_name, email } = await this._authService.getUserInfoFromGoogle(googleAccessToken);

        const existingUser = await this._userRepository.findByEmail(email);

        if (existingUser)
            throw new ConflictError("Correo en uso", "Ya existe una cuenta registrada con este correo electrónico");

        const user = User.build({
            name: given_name,
            lastName: family_name,
            email,
            passwordHash: "GoogleAccount-NoNeedPassword",
        });

        return await this._userRepository.register(user);
    }

    async login({ email, passwordHash }: User) {
        const user = await this._userRepository.login(email);

        if (!user) throw new ValidationError("Credenciales incorrectas", "El correo o la contraseña son incorrectos");

        const isCredentialsValid = await this._authService.validateCredentials(passwordHash, user.passwordHash);

        if (!isCredentialsValid)
            throw new ValidationError("Credenciales incorrectas", "El correo o la contraseña son incorrectos");

        const { accessToken, refreshToken } = this._authService.generateTokens(user);

        return { accessToken, refreshToken, user };
    }

    async loginWithGoogle(googleAccessToken: string) {
        const { email } = await this._authService.getUserInfoFromGoogle(googleAccessToken);
        const user = await this._userRepository.login(email);

        if (!user) throw new ValidationError("Credenciales incorrectas", "El correo no esta registrado");

        const { accessToken, refreshToken } = this._authService.generateTokens(user);

        return { accessToken, refreshToken, user };
    }
}
