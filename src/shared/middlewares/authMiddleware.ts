import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../config/environment.ts";
import { BadRequestError } from "../errors/errorClasses.ts";

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
        if (!token) throw new BadRequestError("Token requerido", "No se proporcionó el token de acceso");

        req.session.user = jwt.verify(token, SECRET_KEY) as { id: string; email: string };
    } catch (error) {
        throw error;
    }

    next();
};
