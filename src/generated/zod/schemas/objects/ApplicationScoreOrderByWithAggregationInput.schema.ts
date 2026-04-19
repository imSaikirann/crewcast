import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ApplicationScoreCountOrderByAggregateInputObjectSchema as ApplicationScoreCountOrderByAggregateInputObjectSchema } from './ApplicationScoreCountOrderByAggregateInput.schema';
import { ApplicationScoreAvgOrderByAggregateInputObjectSchema as ApplicationScoreAvgOrderByAggregateInputObjectSchema } from './ApplicationScoreAvgOrderByAggregateInput.schema';
import { ApplicationScoreMaxOrderByAggregateInputObjectSchema as ApplicationScoreMaxOrderByAggregateInputObjectSchema } from './ApplicationScoreMaxOrderByAggregateInput.schema';
import { ApplicationScoreMinOrderByAggregateInputObjectSchema as ApplicationScoreMinOrderByAggregateInputObjectSchema } from './ApplicationScoreMinOrderByAggregateInput.schema';
import { ApplicationScoreSumOrderByAggregateInputObjectSchema as ApplicationScoreSumOrderByAggregateInputObjectSchema } from './ApplicationScoreSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  applicationId: SortOrderSchema.optional(),
  totalScore: SortOrderSchema.optional(),
  breakdown: SortOrderSchema.optional(),
  evaluatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ApplicationScoreCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ApplicationScoreAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ApplicationScoreMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ApplicationScoreMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ApplicationScoreSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ApplicationScoreOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreOrderByWithAggregationInput>;
export const ApplicationScoreOrderByWithAggregationInputObjectZodSchema = makeSchema();
