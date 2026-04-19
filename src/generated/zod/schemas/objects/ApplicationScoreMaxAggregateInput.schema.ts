import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  applicationId: z.literal(true).optional(),
  totalScore: z.literal(true).optional(),
  evaluatedAt: z.literal(true).optional()
}).strict();
export const ApplicationScoreMaxAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreMaxAggregateInputType>;
export const ApplicationScoreMaxAggregateInputObjectZodSchema = makeSchema();
