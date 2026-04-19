import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  applicationId: SortOrderSchema.optional(),
  totalScore: SortOrderSchema.optional(),
  evaluatedAt: SortOrderSchema.optional()
}).strict();
export const ApplicationScoreMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreMinOrderByAggregateInput>;
export const ApplicationScoreMinOrderByAggregateInputObjectZodSchema = makeSchema();
