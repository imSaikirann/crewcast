import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  roleId: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  required: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const FormFieldMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FormFieldMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldMaxOrderByAggregateInput>;
export const FormFieldMaxOrderByAggregateInputObjectZodSchema = makeSchema();
