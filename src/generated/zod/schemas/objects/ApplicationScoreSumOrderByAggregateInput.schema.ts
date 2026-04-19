import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  totalScore: SortOrderSchema.optional()
}).strict();
export const ApplicationScoreSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreSumOrderByAggregateInput>;
export const ApplicationScoreSumOrderByAggregateInputObjectZodSchema = makeSchema();
