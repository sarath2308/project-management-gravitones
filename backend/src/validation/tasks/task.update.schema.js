import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

export const updateTaskSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    status: z.enum(['todo', 'in-progress', 'done']),

    assignedTo: objectIdSchema.optional(),
  }),
});
