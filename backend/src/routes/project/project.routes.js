import { Router } from 'express';
import { validateRequest } from '../../middleware/validated.request.js';
import { createProjectSchema } from '../../validation/projects/project.create.schema.js';

export function projectRoutes(projectController) {
  const router = Router();

  router.post(
    '/',
    validateRequest(createProjectSchema),
    projectController.createProject.bind(projectController)
  );
  router.get('/', projectController.getProjectsByUserId.bind(projectController));

  return router;
}
