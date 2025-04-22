import { User } from "../../domain/entities/User";
import { UserDTO } from "../dtos/UserDTO";

export const mapToUser = ({ name, lastName, email, password }: UserDTO) =>
    User.build({ name, lastName, email, passwordHash: password });

export const mapToUserDTO = ({ id, name, lastName, email }: User) => new UserDTO(id, name, lastName, email, "");
