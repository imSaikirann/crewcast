import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  formLimit: SortOrderSchema.optional(),
  activeFormCount: SortOrderSchema.optional(),
  totalFormsCount: SortOrderSchema.optional(),
  totalFormsLimit: SortOrderSchema.optional()
}).strict();
export const RecruiterAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterAvgOrderByAggregateInput>;
export const RecruiterAvgOrderByAggregateInputObjectZodSchema = makeSchema();
