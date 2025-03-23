import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const createUserRoutes = (controller: UserController): Router => {
    const router = Router();
    router.post("/create", controller.create.bind(controller));
    return router;
};
