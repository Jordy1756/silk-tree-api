import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/environment";

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
        if (!token) return res.status(401).json({ error: "Acceso no autorizado" });

        if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not defined");

        const data = jwt.verify(token, JWT_SECRET);
        req.session.user = data;
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") return res.status(401).json({ error: "Token inválido" });
        if (error.name === "TokenExpiredError") return res.status(401).json({ error: "Token expirado" });
        next(error);
    }

    next();
};

// import { Request, Response, NextFunction } from "express";

// export const authMiddleware: (req: Request, res: Response, next: NextFunction) => void = (req, res, next) => {
//     // Middleware logic
//     if (!req.headers.authorization) {
//         res.status(401).json({ error: "Unauthorized" });
//         return;
//     }
//     next();
// };
