import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  applicationId: z.literal(true).optional(),
  totalScore: z.literal(true).optional(),
  breakdown: z.literal(true).optional(),
  evaluatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ApplicationScoreCountAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreCountAggregateInputType>;
export const ApplicationScoreCountAggregateInputObjectZodSchema = makeSchema();
