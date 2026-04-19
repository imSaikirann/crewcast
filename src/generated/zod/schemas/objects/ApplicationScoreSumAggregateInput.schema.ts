import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  totalScore: z.literal(true).optional()
}).strict();
export const ApplicationScoreSumAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreSumAggregateInputType>;
export const ApplicationScoreSumAggregateInputObjectZodSchema = makeSchema();
