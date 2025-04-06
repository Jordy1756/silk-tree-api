import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { UserDTO } from "../../application/dtos/UserDTO.ts";
import { UserUseCase } from "../../application/use-cases/UserUseCase.ts";
import { mapToUser, mapToUserDTO } from "../../application/mappers/UserMapper.ts";
import { getTokenCookieConfig } from "../../../../shared/utils/handleJTW.ts";
import { InternalServerError } from "../../../../shared/errors/errorClasses.ts";
import {
    MAX_AGE_ACCESS_TOKEN_COOKIE,
    MAX_AGE_REFRESH_TOKEN_COOKIE,
} from "../../../../shared/constants/jwtConstants.ts";

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

    @httpPost("/register-with-google")
    async registerWithGoogle(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const { googleAccessToken } = req.body;
            const user = await this._userUseCase.registerWithGoogle(googleAccessToken);

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

            res.cookie("access_token", accessToken, getTokenCookieConfig(MAX_AGE_ACCESS_TOKEN_COOKIE));
            res.cookie("refresh_token", refreshToken, getTokenCookieConfig(MAX_AGE_REFRESH_TOKEN_COOKIE));

            res.status(201).json(mapToUserDTO(user));
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/login-with-google")
    async loginWithGoogle(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            const { googleAccessToken } = req.body;
            const { accessToken, refreshToken, user } = await this._userUseCase.loginWithGoogle(googleAccessToken);

            res.cookie("access_token", accessToken, getTokenCookieConfig(MAX_AGE_ACCESS_TOKEN_COOKIE));
            res.cookie("refresh_token", refreshToken, getTokenCookieConfig(MAX_AGE_REFRESH_TOKEN_COOKIE));

            res.status(201).json(mapToUserDTO(user));
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/logout")
    async logout(@request() req: Request, @response() res: Response): Promise<void> {
        try {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            res.status(201).json({ message: "Sesión cerrada exitosamente" });
        } catch (error) {
            throw new InternalServerError("Error interno", "Error al cerrar sesión");
        }
    }

    @httpGet("/auth-status")
    async getAuthStatus(@request() req: Request, @response() res: Response): Promise<void> {
        res.json({ isAuthenticated: Boolean(req.cookies.refresh_token) });
    }
}
