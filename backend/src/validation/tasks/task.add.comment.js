import { z } from 'zod';

export const addCommentSchema = z.object({
  body: z.object({
    comment: z
      .string()
      .trim()
      .min(1, 'Comment is required')
      .max(1000, 'Comment cannot exceed 1000 characters'),
  }),
});
