// import jwt from "jsonwebtoken";
// import { NextFunction, Request, Response } from "express";

// declare global {
//     namespace Express {
//         interface Request {
//             user?: User;
//         }
//     }
// }

// import { JWT_SECRET } from "../config/environment";
// import { User } from "../../features/users/domain/entities/User";

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Error("Token no proporcionado");

//         const token = authHeader.split(" ")[1];

//         if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not defined");

//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded as any;

//         next();
//     } catch (error: any) {
//         if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
//             next(new Error("Token inválido o expirado"));
//             return;
//         }

//         next(error);
//     }
// };
