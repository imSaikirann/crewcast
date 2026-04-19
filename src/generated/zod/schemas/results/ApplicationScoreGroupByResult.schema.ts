import * as z from 'zod';
export const ApplicationScoreGroupByResultSchema = z.array(z.object({
  id: z.string(),
  applicationId: z.string(),
  totalScore: z.number(),
  breakdown: z.unknown(),
  evaluatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    applicationId: z.number(),
    application: z.number(),
    totalScore: z.number(),
    breakdown: z.number(),
    evaluatedAt: z.number()
  }).optional(),
  _sum: z.object({
    totalScore: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    totalScore: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    applicationId: z.string().nullable(),
    totalScore: z.number().nullable(),
    evaluatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    applicationId: z.string().nullable(),
    totalScore: z.number().nullable(),
    evaluatedAt: z.date().nullable()
  }).nullable().optional()
}));