import * as z from 'zod';
export const ApplicationScoreFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  applicationId: z.string(),
  application: z.unknown(),
  totalScore: z.number(),
  breakdown: z.unknown(),
  evaluatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});