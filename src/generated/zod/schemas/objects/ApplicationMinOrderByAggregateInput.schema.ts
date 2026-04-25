import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  trackingToken: SortOrderSchema.optional(),
  jobId: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ApplicationMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationMinOrderByAggregateInput>;
export const ApplicationMinOrderByAggregateInputObjectZodSchema = makeSchema();
