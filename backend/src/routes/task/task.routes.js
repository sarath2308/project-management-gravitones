import { Router } from 'express';
import { validateRequest } from '../../middleware/validated.request.js';
import { createTaskSchema } from '../../validation/tasks/task.create.schema.js';
import { getTasksSchema } from '../../validation/tasks/task.get.schema.js';
import { addCommentSchema } from '../../validation/tasks/task.add.comment.js';
import { updateTaskSchema } from '../../validation/tasks/task.update.schema.js';
import { projectSummarySchema } from '../../validation/tasks/task.summary.schema.js';

export function taskRoutes(taskController) {
  const router = Router();
  router.post("/:projectId",validateRequest(createTaskSchema), taskController.createTask.bind(taskController));
  router.patch("/:id", validateRequest(updateTaskSchema), taskController.updateTask.bind(taskController));
  router.delete("/:id", taskController.deleteTask.bind(taskController));
  router.get("/:projectId/summary", validateRequest(projectSummarySchema), taskController.getProjectSummary.bind(taskController));
  router.get("/:id", taskController.getTaskById.bind(taskController));
  router.post("/:id/comment", validateRequest(addCommentSchema), taskController.addComment.bind(taskController));
  router.get("/", validateRequest(getTasksSchema), taskController.getTasksWithFilters.bind(taskController));
  return router;
}
