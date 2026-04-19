import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  jobId: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  responses: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ApplicationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCountOrderByAggregateInput>;
export const ApplicationCountOrderByAggregateInputObjectZodSchema = makeSchema();
