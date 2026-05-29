import { Router } from "express";
import { taskRoutes } from "./task/task.routes.js";
import { projectRoutes } from "./project/project.routes.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { UserRepository } from "../repositories/user.repo.js";
import { authRoutes } from "./auth/auth.routes.js";
import { wrapAsyncController } from "../utils/wrapper/wrap.async.controller.js";
import { User } from "../models/user.model.js";
import { ProjectController } from "../controllers/project.controller.js";
import { ProjectService } from "../services/project.service.js";
import { ProjectRepository } from "../repositories/project.repo.js";
import { Project } from "../models/project.model.js";

function entryRoutes()
{

    const authController = wrapAsyncController(new AuthController(new AuthService(new UserRepository(User))));
    const projectController = wrapAsyncController(new ProjectController(new ProjectService(new ProjectRepository(Project),new UserRepository(User))));
    const router = Router();
  
    router.use("/project/task",authenticate, taskRoutes());
    router.use("/project",authenticate,projectRoutes(projectController));
    router.use("/auth", authRoutes(authController));

    return router;
}

export default entryRoutes;