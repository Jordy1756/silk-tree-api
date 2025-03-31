import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/environment";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json({ error: "Acceso no autorizado" });

        if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not defined");

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") return res.status(401).json({ error: "Token inválido" });
        if (error.name === "TokenExpiredError") return res.status(401).json({ error: "Token expirado" });
        next(error);
    }
};
