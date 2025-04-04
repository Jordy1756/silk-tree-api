type ErrorProps = {
    name: string;
    defaultMessage: string;
    statusCode: number;
};

const createError = ({ name, defaultMessage, statusCode }: ErrorProps) => {
    return class CustomError extends Error {
        statusCode: number;
        constructor(message?: string) {
            super(message || defaultMessage);
            this.name = name;
            this.statusCode = statusCode;
        }
    };
};

export const NotFoundError = createError({
    name: "NotFoundError",
    defaultMessage: "Resource not found",
    statusCode: 404,
});

export const ValidationError = createError({
    name: "ValidationError",
    defaultMessage: "Validation error",
    statusCode: 422,
});

export const UnauthorizedError = createError({
    name: "UnauthorizedError",
    defaultMessage: "Unauthorized",
    statusCode: 401,
});

export const ForbiddenError = createError({
    name: "ForbiddenError",
    defaultMessage: "Forbidden action",
    statusCode: 403,
});

export const BadRequestError = createError({
    name: "BadRequestError",
    defaultMessage: "Bad request",
    statusCode: 400,
});

export const InternalServerError = createError({
    name: "InternalServerError",
    defaultMessage: "Internal server error",
    statusCode: 500,
});
