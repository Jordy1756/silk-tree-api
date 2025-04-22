import "reflect-metadata";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { PORT } from "./src/shared/config/environment";
import { configureUserContainer } from "./src/features/users/infrastructure/container/UserContainer";
import { sequelize } from "./src/shared/database/connection";
import { configureMedicalAppointmentContainer } from "./src/features/medical-appointments/infrastructure/container/MedicalAppointmentContainer";
import { errorMiddleware } from "./src/shared/middlewares/errorMiddleware";

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
appConfigured.listen(PORT || 5000, () => console.log(`Running on http://localhost:${PORT || 5000}/api`));

(async () => await sequelize.sync())();
