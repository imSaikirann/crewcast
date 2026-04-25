import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  salaryMin: SortOrderSchema.optional(),
  salaryMax: SortOrderSchema.optional(),
  openings: SortOrderSchema.optional(),
  contractDurationMonths: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  reportCount: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional()
}).strict();
export const RecruiterFormSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterFormSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormSumOrderByAggregateInput>;
export const RecruiterFormSumOrderByAggregateInputObjectZodSchema = makeSchema();
