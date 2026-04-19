import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  applicationId: z.literal(true).optional(),
  totalScore: z.literal(true).optional(),
  evaluatedAt: z.literal(true).optional()
}).strict();
export const ApplicationScoreMinAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreMinAggregateInputType>;
export const ApplicationScoreMinAggregateInputObjectZodSchema = makeSchema();
