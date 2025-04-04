import { ErrorRequestHandler } from "express";
import {
    InternalServerError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError,
} from "./errorClasses.ts";
import { NODE_ENV } from "../config/environment.ts";

const isCustomError = (err: Error): boolean =>
    err instanceof InternalServerError ||
    err instanceof ValidationError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof BadRequestError;

export const handleErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode, message } = isCustomError(err) ? err : new InternalServerError("Error interno del servidor");

    res.status(statusCode).json({
        error: message,
        details: NODE_ENV === "development" ? err.message : undefined,
    });
};
