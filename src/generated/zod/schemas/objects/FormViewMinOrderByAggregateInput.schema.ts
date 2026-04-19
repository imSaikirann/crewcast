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
export const FormViewMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FormViewMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewMinOrderByAggregateInput>;
export const FormViewMinOrderByAggregateInputObjectZodSchema = makeSchema();
