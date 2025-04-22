import "reflect-metadata";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { configureUserContainer } from "./src/features/users/infrastructure/container/UserContainer";
import { configureMedicalAppointmentContainer } from "./src/features/medical-appointments/infrastructure/container/MedicalAppointmentContainer";
import { errorMiddleware } from "./src/shared/middlewares/errorMiddleware";
import { sequelize } from "./src/shared/database/connection";

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: ["http://localhost:5173", "https://silk-tree.vercel.app/"], credentials: true }));
app.use(json());
app.use(cookieParser());

const rootContainer = new Container();
configureUserContainer(rootContainer);
configureMedicalAppointmentContainer(rootContainer);

const server = new InversifyExpressServer(rootContainer, null, { rootPath: "/api" }, app);
const appConfigured = server.build();

appConfigured.use(errorMiddleware);

// Sin appConfigured.listen()

// Sincroniza la base de datos antes de exportar (puedes manejarlo mejor según tu lógica)
(async () => await sequelize.sync())();

export default appConfigured;
