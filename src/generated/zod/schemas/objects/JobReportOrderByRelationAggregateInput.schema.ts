import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const JobReportOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.JobReportOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportOrderByRelationAggregateInput>;
export const JobReportOrderByRelationAggregateInputObjectZodSchema = makeSchema();
