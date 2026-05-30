import { z } from 'zod';

export const getTasksSchema = z.object({
  query: z.object({
    status: z.enum(['todo', 'in-progress', 'done']).optional(),

    page: z.string().regex(/^\d+$/, 'Page must be a number').optional(),

    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional(),

    sortBy: z.enum(['createdAt', 'status']).optional(),
  }),
});
