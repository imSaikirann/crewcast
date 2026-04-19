import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { DomainsCountOrderByAggregateInputObjectSchema as DomainsCountOrderByAggregateInputObjectSchema } from './DomainsCountOrderByAggregateInput.schema';
import { DomainsAvgOrderByAggregateInputObjectSchema as DomainsAvgOrderByAggregateInputObjectSchema } from './DomainsAvgOrderByAggregateInput.schema';
import { DomainsMaxOrderByAggregateInputObjectSchema as DomainsMaxOrderByAggregateInputObjectSchema } from './DomainsMaxOrderByAggregateInput.schema';
import { DomainsMinOrderByAggregateInputObjectSchema as DomainsMinOrderByAggregateInputObjectSchema } from './DomainsMinOrderByAggregateInput.schema';
import { DomainsSumOrderByAggregateInputObjectSchema as DomainsSumOrderByAggregateInputObjectSchema } from './DomainsSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  jobCount: SortOrderSchema.optional(),
  haveDefaultForm: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => DomainsCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => DomainsAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => DomainsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => DomainsMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => DomainsSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const DomainsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DomainsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsOrderByWithAggregationInput>;
export const DomainsOrderByWithAggregationInputObjectZodSchema = makeSchema();
