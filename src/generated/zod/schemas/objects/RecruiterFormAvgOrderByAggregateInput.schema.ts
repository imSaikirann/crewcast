import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  salaryMin: SortOrderSchema.optional(),
  salaryMax: SortOrderSchema.optional(),
  contractDurationMonths: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  reportCount: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional()
}).strict();
export const RecruiterFormAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterFormAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormAvgOrderByAggregateInput>;
export const RecruiterFormAvgOrderByAggregateInputObjectZodSchema = makeSchema();
