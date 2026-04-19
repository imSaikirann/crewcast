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
export const DomainsMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DomainsMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsMinOrderByAggregateInput>;
export const DomainsMinOrderByAggregateInputObjectZodSchema = makeSchema();
