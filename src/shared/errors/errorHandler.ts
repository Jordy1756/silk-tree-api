import {
    InternalServerError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ConflictError,
} from "./errorClasses.ts";

export const isCustomError = (err: Error): boolean =>
    err instanceof InternalServerError ||
    err instanceof ValidationError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof BadRequestError ||
    err instanceof ConflictError;
