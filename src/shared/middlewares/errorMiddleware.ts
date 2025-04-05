import { ErrorRequestHandler } from "express";
import { isCustomError } from "../errors/errorHandler.ts";
import { InternalServerError } from "../errors/errorClasses.ts";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const { name, statusCode, message } = isCustomError(err) ? err : new InternalServerError();

    res.status(statusCode).json({ name, message });
};
