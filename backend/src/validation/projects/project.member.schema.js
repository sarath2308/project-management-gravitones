import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

export const projectMemberSchema = z.object({
  params: z.object({
    projectId: objectIdSchema,
  }),
  body: z.object({
    userId: objectIdSchema,
  }),
});
