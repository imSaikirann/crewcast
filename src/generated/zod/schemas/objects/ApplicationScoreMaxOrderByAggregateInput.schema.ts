import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  applicationId: SortOrderSchema.optional(),
  totalScore: SortOrderSchema.optional(),
  evaluatedAt: SortOrderSchema.optional()
}).strict();
export const ApplicationScoreMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreMaxOrderByAggregateInput>;
export const ApplicationScoreMaxOrderByAggregateInputObjectZodSchema = makeSchema();
