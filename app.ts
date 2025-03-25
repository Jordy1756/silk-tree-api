import express from "express";
import { connection } from "./src/shared/database/connection";
import { JWT_SECRET, PORT } from "./src/shared/config/environment";
import { createUserRoutes } from "./src/features/users/infrastructure/routes/UserRoutes";
import { UserController } from "./src/features/users/infrastructure/controllers/UserController";

// Configurar Express
const app = express();
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);

connection
    .getConnection()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT || 3000, () => console.log(`Server running on port ${PORT || 3000}`));
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });
