import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { UserDTO } from "../../application/dtos/UserDTO.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { mapToUser, mapToUserDTO } from "../../application/mappers/UserMapper.ts";
import { getTokenCookieConfig } from "../utils/handleJTW.ts";
import { InternalServerError, UnauthorizedError } from "../../../../shared/errors/errorClasses.ts";

@controller("/user")
export class UserController implements interfaces.Controller {
    constructor(@inject(UserUseCase) private readonly _userUseCase: UserUseCase) {}

    @httpPost("/register")
    async register(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const user = await this._userUseCase.register(mapToUser(userData));

            res.status(201).json(mapToUserDTO(user));
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/login")
    async login(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const { accessToken, refreshToken, user } = await this._userUseCase.login(mapToUser(userData));

            res.cookie("access_token", accessToken, getTokenCookieConfig(60 * 1000));
            res.cookie("refresh_token", refreshToken, getTokenCookieConfig(2 * 60 * 1000));

            res.status(201).json(mapToUserDTO(user));
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/refreshToken")
    async refreshToken(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) throw new UnauthorizedError("No se proporcionó refresh token");

            const { newAccessToken, newRefreshToken } = await this._userUseCase.refreshTokens(refreshToken);

            res.cookie("access_token", newAccessToken, getTokenCookieConfig(60 * 1000));
            res.cookie("refresh_token", newRefreshToken, getTokenCookieConfig(2 * 60 * 1000));

            res.status(200).json({ message: "Tokens renovados exitosamente" });
        } catch (error) {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            throw error;
        }
    }

    @httpPost("/logout")
    async logout(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            res.status(200).json({ message: "Sesión cerrada exitosamente" });
        } catch (error) {
            throw new InternalServerError("Error al cerrar sesión");
        }
    }
}
