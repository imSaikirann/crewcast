import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  domainId: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  isForSoftwareRoles: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DefaultFormSchemaMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaMaxOrderByAggregateInput>;
export const DefaultFormSchemaMaxOrderByAggregateInputObjectZodSchema = makeSchema();
