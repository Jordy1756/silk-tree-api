import { ErrorRequestHandler } from "express";
import { isCustomError } from "../errors/errorHandler.js";
import { InternalServerError } from "../errors/errorClasses.js";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    const { name, statusCode, message } = isCustomError(err) ? err : new InternalServerError();

    res.status(statusCode).json({ name, message });
};
