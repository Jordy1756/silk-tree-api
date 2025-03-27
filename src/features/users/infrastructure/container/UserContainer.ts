import { Container } from "inversify";
import { UserRepository } from "../repositories/UserRepository.ts";
import { USER_TYPES } from "./UserTypes.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { IUserRepository } from "../../domain/interfaces/IUserRepository.ts";
import "../controllers/UserController.ts";

export function configureUserContainer(container: Container) {
    container.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
    container.bind(UserUseCase).toSelf();

    return container;
}
