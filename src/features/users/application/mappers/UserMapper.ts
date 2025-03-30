import { User } from "../../domain/entities/User.ts";
import { UserDTO } from "../dtos/UserDTO.ts";

export const mapToUser = ({ name, lastName, email, password }: UserDTO) =>
    User.build({ name, lastName, email, passwordHash: password });

export const mapToUserDTO = ({ id, name, lastName, email }: User) => new UserDTO(id, name, lastName, email, "");
