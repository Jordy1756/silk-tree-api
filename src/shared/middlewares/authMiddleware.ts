import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { REFRESH_SECRET_KEY, SECRET_KEY } from "../config/environment.ts";
import { UnauthorizedError } from "../errors/errorClasses.ts";
import { getTokenCookieConfig } from "../utils/handleJTW.ts";
import { MAX_AGE_ACCESS_TOKEN_COOKIE, MAX_AGE_ACCESS_TOKEN_JWT } from "../constants/jwtConstants.ts";

declare global {
    namespace Express {
        interface Request {
            session: { user: { id: string; email: string } };
        }
    }
}

type JWTPayload = {
    id: string;
    email: string;
    exp?: number;
    iat?: number;
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    let user = { id: "", email: "" };

    try {
        if (!refreshToken)
            throw new UnauthorizedError(
                "Sesión inválida",
                "Tu sesión ha expirado. Por favor, inicia sesión nuevamente"
            );

        if (accessToken) {
            user = jwt.verify(accessToken, SECRET_KEY) as JWTPayload;
            req.session = { user };

            return next();
        }

        const { id, email } = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as JWTPayload;

        user = { id, email };

        const newAccessToken = jwt.sign(user, SECRET_KEY, { expiresIn: MAX_AGE_ACCESS_TOKEN_JWT });
        res.cookie("access_token", newAccessToken, getTokenCookieConfig(MAX_AGE_ACCESS_TOKEN_COOKIE));
        req.session = { user };
    } catch (error) {
        throw error;
    }

    next();
};
