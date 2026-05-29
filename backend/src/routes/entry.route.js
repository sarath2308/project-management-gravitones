import { Router } from "express";
import { taskRoutes } from "./task/task.routes.js";
import { projectRoutes } from "./project/project.routes.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { UserRepository } from "../repositories/user.repo.js";
import { authRoutes } from "./auth/auth.routes.js";
import { wrapAsyncController } from "../utils/wrapper/wrap.async.controller.js";

function entryRoutes()
{

    const authController = wrapAsyncController(new AuthController(new AuthService(new UserRepository())));
    const router = Router();
  
    router.use("/project/task",authenticate, taskRoutes());
    router.use("/project",authenticate,projectRoutes());
    router.use("/auth", authRoutes(authController));

    return router;
}

export default entryRoutes;