import * as z from 'zod';
export const ApplicationScoreFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  applicationId: z.string(),
  application: z.unknown(),
  totalScore: z.number(),
  breakdown: z.unknown(),
  evaluatedAt: z.date()
}));