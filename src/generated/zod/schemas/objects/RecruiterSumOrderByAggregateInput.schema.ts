import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  formLimit: SortOrderSchema.optional(),
  activeFormCount: SortOrderSchema.optional(),
  totalFormsCount: SortOrderSchema.optional(),
  totalFormsLimit: SortOrderSchema.optional()
}).strict();
export const RecruiterSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterSumOrderByAggregateInput>;
export const RecruiterSumOrderByAggregateInputObjectZodSchema = makeSchema();
