import { ErrorRequestHandler } from "express";
import { NODE_ENV } from "../config/environment";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: "Ha ocurrido un error interno del servidor",
        details: NODE_ENV === "development" ? err.message : undefined,
    });
};
