import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  applicationId: SortOrderSchema.optional(),
  totalScore: SortOrderSchema.optional(),
  breakdown: SortOrderSchema.optional(),
  evaluatedAt: SortOrderSchema.optional()
}).strict();
export const ApplicationScoreCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreCountOrderByAggregateInput>;
export const ApplicationScoreCountOrderByAggregateInputObjectZodSchema = makeSchema();
