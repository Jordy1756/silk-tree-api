// import express, { json } from "express";
// import cors from "cors";
// import { connection } from "./src/shared/database/connection.ts";
import "reflect-metadata";
import { InversifyExpressServer, TYPE } from "inversify-express-utils";
import { Container } from "inversify";
import { JWT_SECRET, PORT } from "./src/shared/config/environment.ts";
import "./src/features/users/infrastructure/controllers/UserController.ts";
import { UserUseCase } from "./src/features/users/application/use-cases/UserUseCase.ts";

const container = new Container();
container.bind<UserUseCase>("UserUseCase").to(UserUseCase)
const server = new InversifyExpressServer(container, null, { rootPath: "/api" });

server.build().listen(PORT || 5000);

// Configurar Express
// const app = express();
// app.use(cors());
// app.use(json());

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
