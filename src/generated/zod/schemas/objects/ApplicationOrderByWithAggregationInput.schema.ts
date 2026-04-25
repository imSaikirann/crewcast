import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ApplicationCountOrderByAggregateInputObjectSchema as ApplicationCountOrderByAggregateInputObjectSchema } from './ApplicationCountOrderByAggregateInput.schema';
import { ApplicationMaxOrderByAggregateInputObjectSchema as ApplicationMaxOrderByAggregateInputObjectSchema } from './ApplicationMaxOrderByAggregateInput.schema';
import { ApplicationMinOrderByAggregateInputObjectSchema as ApplicationMinOrderByAggregateInputObjectSchema } from './ApplicationMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  trackingToken: SortOrderSchema.optional(),
  jobId: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  responses: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ApplicationCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ApplicationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ApplicationMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ApplicationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ApplicationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationOrderByWithAggregationInput>;
export const ApplicationOrderByWithAggregationInputObjectZodSchema = makeSchema();
