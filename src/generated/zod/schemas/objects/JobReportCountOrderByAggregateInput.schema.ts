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
export const JobReportCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.JobReportCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportCountOrderByAggregateInput>;
export const JobReportCountOrderByAggregateInputObjectZodSchema = makeSchema();
