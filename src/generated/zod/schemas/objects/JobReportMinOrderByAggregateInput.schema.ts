import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  formId: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  message: SortOrderSchema.optional(),
  ip: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const JobReportMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.JobReportMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportMinOrderByAggregateInput>;
export const JobReportMinOrderByAggregateInputObjectZodSchema = makeSchema();
