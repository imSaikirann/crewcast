import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  totalScore: z.literal(true).optional()
}).strict();
export const ApplicationScoreAvgAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreAvgAggregateInputType>;
export const ApplicationScoreAvgAggregateInputObjectZodSchema = makeSchema();
