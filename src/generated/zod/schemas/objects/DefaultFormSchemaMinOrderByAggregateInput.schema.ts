import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  domainId: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DefaultFormSchemaMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaMinOrderByAggregateInput>;
export const DefaultFormSchemaMinOrderByAggregateInputObjectZodSchema = makeSchema();
