import "reflect-metadata";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
// import { PORT } from "./src/shared/config/environment.ts";
import { configureUserContainer } from "./src/features/users/infrastructure/container/UserContainer.ts";
// import { sequelize } from "./src/shared/database/connection.ts";
import { configureMedicalAppointmentContainer } from "./src/features/medical-appointments/infrastructure/container/MedicalAppointmentContainer.ts";
import { errorMiddleware } from "./src/shared/middlewares/errorMiddleware.ts";
import { NODE_ENV, PORT } from "./src/shared/config/environment.ts";

const app = express();
app.disable("x-powered-by");
app.use(
    cors({
        origin:
            process.env.NODE_ENV === "production"
                ? process.env.FRONTEND_URL || "https://yourdomain.com"
                : "http://localhost:5173",
        credentials: true,
    })
);
app.use(json());
app.use(cookieParser());

// Configuración de DI
const rootContainer = new Container();
configureUserContainer(rootContainer);
configureMedicalAppointmentContainer(rootContainer);

// Configuración del servidor
const server = new InversifyExpressServer(rootContainer, null, { rootPath: "/api" }, app);
const appConfigured = server.build();
appConfigured.use(errorMiddleware);

// Para entornos no serverless, iniciar el servidor
if (NODE_ENV !== "production") {
    appConfigured.listen(PORT || 5000, () => console.log(`Running on http://localhost:${PORT}/api`));
}

// Exportar para Vercel
export default appConfigured;
