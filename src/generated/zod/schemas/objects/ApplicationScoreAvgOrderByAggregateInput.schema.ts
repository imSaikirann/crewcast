import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  totalScore: SortOrderSchema.optional()
}).strict();
export const ApplicationScoreAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreAvgOrderByAggregateInput>;
export const ApplicationScoreAvgOrderByAggregateInputObjectZodSchema = makeSchema();
