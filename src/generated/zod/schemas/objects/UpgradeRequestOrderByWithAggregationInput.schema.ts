import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UpgradeRequestCountOrderByAggregateInputObjectSchema as UpgradeRequestCountOrderByAggregateInputObjectSchema } from './UpgradeRequestCountOrderByAggregateInput.schema';
import { UpgradeRequestMaxOrderByAggregateInputObjectSchema as UpgradeRequestMaxOrderByAggregateInputObjectSchema } from './UpgradeRequestMaxOrderByAggregateInput.schema';
import { UpgradeRequestMinOrderByAggregateInputObjectSchema as UpgradeRequestMinOrderByAggregateInputObjectSchema } from './UpgradeRequestMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  company: SortOrderSchema.optional(),
  plan: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UpgradeRequestCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UpgradeRequestMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UpgradeRequestMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UpgradeRequestOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UpgradeRequestOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UpgradeRequestOrderByWithAggregationInput>;
export const UpgradeRequestOrderByWithAggregationInputObjectZodSchema = makeSchema();
