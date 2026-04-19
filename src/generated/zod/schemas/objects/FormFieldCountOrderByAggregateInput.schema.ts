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
  options: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const FormFieldCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FormFieldCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCountOrderByAggregateInput>;
export const FormFieldCountOrderByAggregateInputObjectZodSchema = makeSchema();
