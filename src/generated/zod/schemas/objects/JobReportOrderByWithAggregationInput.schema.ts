import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { JobReportCountOrderByAggregateInputObjectSchema as JobReportCountOrderByAggregateInputObjectSchema } from './JobReportCountOrderByAggregateInput.schema';
import { JobReportMaxOrderByAggregateInputObjectSchema as JobReportMaxOrderByAggregateInputObjectSchema } from './JobReportMaxOrderByAggregateInput.schema';
import { JobReportMinOrderByAggregateInputObjectSchema as JobReportMinOrderByAggregateInputObjectSchema } from './JobReportMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  formId: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  message: SortOrderSchema.optional(),
  ip: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => JobReportCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => JobReportMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => JobReportMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const JobReportOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.JobReportOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportOrderByWithAggregationInput>;
export const JobReportOrderByWithAggregationInputObjectZodSchema = makeSchema();
