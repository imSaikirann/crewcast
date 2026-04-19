import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  domainId: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  fields: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DefaultFormSchemaCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaCountOrderByAggregateInput>;
export const DefaultFormSchemaCountOrderByAggregateInputObjectZodSchema = makeSchema();
