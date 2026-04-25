import * as z from 'zod';
export const ApplicationUpsertResultSchema = z.object({
  id: z.string(),
  trackingToken: z.string(),
  jobId: z.string(),
  job: z.unknown(),
  fullName: z.string(),
  email: z.string(),
  responses: z.unknown(),
  status: z.unknown(),
  scores: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
});