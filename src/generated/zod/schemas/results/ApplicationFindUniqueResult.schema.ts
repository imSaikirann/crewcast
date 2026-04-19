import * as z from 'zod';
export const ApplicationFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  jobId: z.string(),
  job: z.unknown(),
  fullName: z.string(),
  email: z.string(),
  responses: z.unknown(),
  status: z.unknown(),
  scores: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));