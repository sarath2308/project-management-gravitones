import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

export const updateProjectSchema = z.object({
  params: z.object({
    projectId: objectIdSchema,
  }),
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, 'Project name must be at least 3 characters')
      .max(100, 'Project name cannot exceed 100 characters')
      .optional(),

    description: z.string().trim().max(500, 'Description cannot exceed 500 characters').optional(),
  }),
});
