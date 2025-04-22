import { Container } from "inversify";
import { UserRepository } from "../repositories/UserRepository.js";
import { USER_TYPES } from "./UserTypes.js";
import { UserUseCase } from "../../application/use-cases/UserUseCase.js";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.js";
import { IAuthService } from "../../domain/interfaces/IAuthService.js";
import { AuthService } from "../../domain/services/AuthService.js";
import "../controllers/UserController.js";

export function configureUserContainer(container: Container) {
    container.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
    container.bind<IAuthService>(USER_TYPES.IAuthService).to(AuthService);
    container.bind(UserUseCase).toSelf().inSingletonScope();

    return container;
}
