import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  jobId: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ApplicationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationMaxOrderByAggregateInput>;
export const ApplicationMaxOrderByAggregateInputObjectZodSchema = makeSchema();
