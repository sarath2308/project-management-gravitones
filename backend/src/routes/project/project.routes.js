import { Router } from 'express';
import { validateRequest } from '../../middleware/validated.request.js';
import { createProjectSchema } from '../../validation/projects/project.create.schema.js';
import { updateProjectSchema } from '../../validation/projects/project.update.schema.js';
import { projectParamsSchema } from '../../validation/projects/project.params.schema.js';
import { projectMemberSchema } from '../../validation/projects/project.member.schema.js';

export function projectRoutes(projectController) {
  const router = Router();

  router.post(
    '/',
    validateRequest(createProjectSchema),
    projectController.createProject.bind(projectController)
  );
  router.get('/', projectController.getProjectsByUserId.bind(projectController));

  router.get(
    '/:projectId',
    validateRequest(projectParamsSchema),
    projectController.getProjectById.bind(projectController)
  );

  router.patch(
    '/:projectId',
    validateRequest(updateProjectSchema),
    projectController.updateProject.bind(projectController)
  );

  router.delete(
    '/:projectId',
    validateRequest(projectParamsSchema),
    projectController.deleteProject.bind(projectController)
  );

  router.post(
    '/:projectId/member',
    validateRequest(projectMemberSchema),
    projectController.addMember.bind(projectController)
  );

  router.delete(
    '/:projectId/member',
    validateRequest(projectMemberSchema),
    projectController.removeMember.bind(projectController)
  );

  return router;
}
