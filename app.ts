import "reflect-metadata";
import express, { json } from "express";
import cors from "cors";
import { InversifyExpressServer, TYPE } from "inversify-express-utils";
import { Container } from "inversify";
import { PORT } from "./src/shared/config/environment.ts";
import { configureUserContainer } from "./src/features/users/infrastructure/container/UserContainer.ts";
import { errorHandler } from "./src/shared/errors/errorHandler.ts";

const app = express();
app.use(cors());
app.use(json());
app.use(errorHandler);

const rootContainer = new Container();

configureUserContainer(rootContainer);

const server = new InversifyExpressServer(rootContainer, null, { rootPath: "/api" }, app);

server.build().listen(PORT || 5000, () => console.log(`Running on http://localhost:${PORT || 5000}/api`));

// connection
//     .getConnection()
//     .then(() => {
//         console.log("Database connected");
//         app.listen(PORT || 3000, () => console.log(`Server running on port ${PORT || 3000}`));
//         app.use("/api/users", createUserRoutes(new UserController(new UserUseCase(new UserRepository(connection)))));
//     })
//     .catch((err) => {
//         console.error("Database connection failed:", err);
//         process.exit(1);
//     });
