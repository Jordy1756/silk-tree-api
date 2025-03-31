import { Container } from "inversify";
import { UserRepository } from "../repositories/UserRepository.ts";
import { USER_TYPES } from "./UserTypes.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import { IAuthService } from "../../domain/interfaces/IAuthService.ts";
import { AuthService } from "../../domain/services/AuthService.ts";
import "../controllers/UserController.ts";

export function configureUserContainer(container: Container) {
    container.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
    container.bind<IAuthService>(USER_TYPES.IAuthService).to(AuthService);
    container.bind(UserUseCase).toSelf().inSingletonScope();

    return container;
}
