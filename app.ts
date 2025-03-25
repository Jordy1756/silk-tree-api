import express from "express";
import { connection } from "./src/shared/database/connection";
import { PORT } from "./src/shared/config/environment";
import { createUserRoutes } from "./src/features/users/infrastructure/routes/UserRoutes";
import { UserController } from "./src/features/users/infrastructure/controllers/UserController";

// Crear instancias
const userRoutes = createUserRoutes(UserController);

const userRepository = new UserRepository();
const authService = new AuthService(secretKey);

const userController = new UserController(manageUser);
const userAuthController = new UserController(manageAuth);

// Crear instancias de rutas
const userRoutes = createUserRoutes(userController);
const userAuthRoutes = createUserRoutes(userAuthController);

// Configurar Express
const app = express();
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);


connection
    .getConnection()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT || 3000, () => {
            console.log(`Server running on port ${PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });
