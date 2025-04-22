import { Container } from "inversify";
import { UserRepository } from "../repositories/UserRepository";
import { USER_TYPES } from "./UserTypes";
import { UserUseCase } from "../../application/use-cases/UserUseCase";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { AuthService } from "../../domain/services/AuthService";
import "../controllers/UserController";

export function configureUserContainer(container: Container) {
    container.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
    container.bind<IAuthService>(USER_TYPES.IAuthService).to(AuthService);
    container.bind(UserUseCase).toSelf().inSingletonScope();

    return container;
}
