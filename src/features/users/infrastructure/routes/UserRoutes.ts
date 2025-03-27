import { Router } from "express";
import { UserController } from "../controllers/UserController.ts";

export const createUserRoutes = (userController: UserController): Router => {
    const router = Router();
    router.post("/register", userController.register);
    return router;
};
