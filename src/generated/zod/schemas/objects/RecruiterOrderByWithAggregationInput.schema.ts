import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecruiterCountOrderByAggregateInputObjectSchema as RecruiterCountOrderByAggregateInputObjectSchema } from './RecruiterCountOrderByAggregateInput.schema';
import { RecruiterAvgOrderByAggregateInputObjectSchema as RecruiterAvgOrderByAggregateInputObjectSchema } from './RecruiterAvgOrderByAggregateInput.schema';
import { RecruiterMaxOrderByAggregateInputObjectSchema as RecruiterMaxOrderByAggregateInputObjectSchema } from './RecruiterMaxOrderByAggregateInput.schema';
import { RecruiterMinOrderByAggregateInputObjectSchema as RecruiterMinOrderByAggregateInputObjectSchema } from './RecruiterMinOrderByAggregateInput.schema';
import { RecruiterSumOrderByAggregateInputObjectSchema as RecruiterSumOrderByAggregateInputObjectSchema } from './RecruiterSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  companyName: SortOrderSchema.optional(),
  companyEmail: SortOrderSchema.optional(),
  website: SortOrderSchema.optional(),
  linkedinLink: SortOrderSchema.optional(),
  verified: SortOrderSchema.optional(),
  plan: SortOrderSchema.optional(),
  formLimit: SortOrderSchema.optional(),
  activeFormCount: SortOrderSchema.optional(),
  totalFormsCount: SortOrderSchema.optional(),
  totalFormsLimit: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => RecruiterCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RecruiterAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RecruiterMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RecruiterMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RecruiterSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RecruiterOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecruiterOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterOrderByWithAggregationInput>;
export const RecruiterOrderByWithAggregationInputObjectZodSchema = makeSchema();
