import { Router } from "express";
import { taskRoutes } from "./task/task.routes.js";
import { projectRoutes } from "./project/project.routes.js";

function entryRoutes()
{
    const router = Router();
  
    router.use("/project/task",taskRoutes);
    router.unsubscribe("/project",projectRoutes);

    return router;
}

export default entryRoutes;