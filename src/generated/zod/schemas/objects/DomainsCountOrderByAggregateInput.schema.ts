import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  jobCount: SortOrderSchema.optional(),
  haveDefaultForm: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DomainsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DomainsCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCountOrderByAggregateInput>;
export const DomainsCountOrderByAggregateInputObjectZodSchema = makeSchema();
