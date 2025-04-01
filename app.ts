import "reflect-metadata";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { PORT } from "./src/shared/config/environment.ts";
import { configureUserContainer } from "./src/features/users/infrastructure/container/UserContainer.ts";
import { errorHandler } from "./src/shared/errors/errorHandler.ts";
import { sequelize } from "./src/shared/database/connection.ts";

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json());
app.use(cookieParser());
app.use(errorHandler);

const rootContainer = new Container();

configureUserContainer(rootContainer);

const server = new InversifyExpressServer(rootContainer, null, { rootPath: "/api" }, app);

server.build().listen(PORT || 5000, () => console.log(`Running on http://localhost:${PORT || 5000}/api`));

(async () => await sequelize.sync())();
