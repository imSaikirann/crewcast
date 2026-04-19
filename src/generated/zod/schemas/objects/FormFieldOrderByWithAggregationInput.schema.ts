import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FormFieldCountOrderByAggregateInputObjectSchema as FormFieldCountOrderByAggregateInputObjectSchema } from './FormFieldCountOrderByAggregateInput.schema';
import { FormFieldMaxOrderByAggregateInputObjectSchema as FormFieldMaxOrderByAggregateInputObjectSchema } from './FormFieldMaxOrderByAggregateInput.schema';
import { FormFieldMinOrderByAggregateInputObjectSchema as FormFieldMinOrderByAggregateInputObjectSchema } from './FormFieldMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  roleId: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  required: SortOrderSchema.optional(),
  options: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => FormFieldCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => FormFieldMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => FormFieldMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const FormFieldOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.FormFieldOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldOrderByWithAggregationInput>;
export const FormFieldOrderByWithAggregationInputObjectZodSchema = makeSchema();
