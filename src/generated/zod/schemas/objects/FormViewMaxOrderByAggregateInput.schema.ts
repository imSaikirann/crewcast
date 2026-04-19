import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  formId: SortOrderSchema.optional(),
  ip: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const FormViewMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FormViewMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewMaxOrderByAggregateInput>;
export const FormViewMaxOrderByAggregateInputObjectZodSchema = makeSchema();
