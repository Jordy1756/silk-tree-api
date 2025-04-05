type ErrorProps = {
    defaultName: string;
    defaultMessage: string;
    statusCode: number;
};

const createError = ({ defaultName, defaultMessage, statusCode }: ErrorProps) => {
    return class BusinessError extends Error {
        statusCode: number;
        constructor(name?: string, message?: string) {
            super(message || defaultMessage);
            this.name = name || defaultName;
            this.statusCode = statusCode;
        }
    };
};

export const NotFoundError = createError({
    defaultName: "No encontrado",
    defaultMessage: "El recurso que buscas no está disponible o ha sido eliminado",
    statusCode: 404,
});

export const ValidationError = createError({
    defaultName: "Error de validación",
    defaultMessage: "Los datos proporcionados no cumplen con los requisitos necesarios",
    statusCode: 422,
});

export const UnauthorizedError = createError({
    defaultName: "No autorizado",
    defaultMessage: "No tienes permiso para acceder. Por favor, inicia sesión",
    statusCode: 401,
});

export const ForbiddenError = createError({
    defaultName: "Acceso denegado",
    defaultMessage: "No tienes permisos suficientes para realizar esta acción",
    statusCode: 403,
});

export const BadRequestError = createError({
    defaultName: "Solicitud inválida",
    defaultMessage: "La solicitud no pudo ser procesada. Verifica los datos enviados",
    statusCode: 400,
});

export const InternalServerError = createError({
    defaultName: "Error del servidor",
    defaultMessage: "Ha ocurrido un error inesperado. Por favor, intenta más tarde",
    statusCode: 500,
});

export const ConflictError = createError({
    defaultName: "Conflicto",
    defaultMessage: "El recurso ya existe o está en conflicto con otro existente",
    statusCode: 409,
});
