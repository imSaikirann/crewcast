import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FormViewCountOrderByAggregateInputObjectSchema as FormViewCountOrderByAggregateInputObjectSchema } from './FormViewCountOrderByAggregateInput.schema';
import { FormViewMaxOrderByAggregateInputObjectSchema as FormViewMaxOrderByAggregateInputObjectSchema } from './FormViewMaxOrderByAggregateInput.schema';
import { FormViewMinOrderByAggregateInputObjectSchema as FormViewMinOrderByAggregateInputObjectSchema } from './FormViewMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  formId: SortOrderSchema.optional(),
  ip: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => FormViewCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => FormViewMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => FormViewMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const FormViewOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.FormViewOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewOrderByWithAggregationInput>;
export const FormViewOrderByWithAggregationInputObjectZodSchema = makeSchema();
