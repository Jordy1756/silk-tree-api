import { ErrorRequestHandler } from "express";
import { isCustomError } from "../errors/errorHandler";
import { InternalServerError } from "../errors/errorClasses";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    const { name, statusCode, message } = isCustomError(err) ? err : new InternalServerError();

    res.status(statusCode).json({ name, message });
};
