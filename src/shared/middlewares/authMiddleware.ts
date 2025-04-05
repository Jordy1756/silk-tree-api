import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../config/environment.ts";
import { InternalServerError, UnauthorizedError } from "../errors/errorClasses.ts";

declare global {
    namespace Express {
        interface Request {
            session: { user: { id: string; email: string } };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    req.session.user = { id: "", email: "" };

    try {
        if (!token) throw new UnauthorizedError("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");

        if (!SECRET_KEY) throw new InternalServerError("La clave secreta para JWT no está configurada");

        req.session.user = jwt.verify(token, SECRET_KEY) as { id: string; email: string };
    } catch (error) {
        throw error;
    }

    next();
};
