import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title cannot exceed 100 characters'),

    description: z
      .string()
      .trim()
      .max(1000, 'Description cannot exceed 1000 characters')
      .optional(),

    projectId: z.string().min(1, 'Project ID is required'),

    assignedTo: z.string().optional(),
  }),
});
