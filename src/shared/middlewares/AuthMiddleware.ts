import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../config/environment.ts";

declare global {
    namespace Express {
        interface Request {
            session?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    try {
        if (!token) return res.status(401).json({ error: "Acceso no autorizado 33" });

        if (!SECRET_KEY) throw new Error("La variable de entorno JWT_SECRET no está definida");

        req.session.user = jwt.verify(token, SECRET_KEY);
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") return res.status(401).json({ error: "Token inválido" });
        if (error.name === "TokenExpiredError") return res.status(401).json({ error: "Token expirado" });
        next(error);
    }

    next();
};
