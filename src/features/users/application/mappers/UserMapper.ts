import { User } from "../../domain/entities/User.ts";
import { UserDTO } from "../dtos/UserDTO.ts";

export const mapToUser = ({ id, name, lastName, email, password }: UserDTO) =>
    new User(id, name, lastName, email, password);

export const mapToUserDTO = ({ id, name, lastName, email }: User) => new UserDTO(id, name, lastName, email, "");
