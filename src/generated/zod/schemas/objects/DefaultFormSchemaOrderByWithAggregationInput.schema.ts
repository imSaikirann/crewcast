import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { DefaultFormSchemaCountOrderByAggregateInputObjectSchema as DefaultFormSchemaCountOrderByAggregateInputObjectSchema } from './DefaultFormSchemaCountOrderByAggregateInput.schema';
import { DefaultFormSchemaAvgOrderByAggregateInputObjectSchema as DefaultFormSchemaAvgOrderByAggregateInputObjectSchema } from './DefaultFormSchemaAvgOrderByAggregateInput.schema';
import { DefaultFormSchemaMaxOrderByAggregateInputObjectSchema as DefaultFormSchemaMaxOrderByAggregateInputObjectSchema } from './DefaultFormSchemaMaxOrderByAggregateInput.schema';
import { DefaultFormSchemaMinOrderByAggregateInputObjectSchema as DefaultFormSchemaMinOrderByAggregateInputObjectSchema } from './DefaultFormSchemaMinOrderByAggregateInput.schema';
import { DefaultFormSchemaSumOrderByAggregateInputObjectSchema as DefaultFormSchemaSumOrderByAggregateInputObjectSchema } from './DefaultFormSchemaSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  domainId: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  fields: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  isForSoftwareRoles: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => DefaultFormSchemaCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => DefaultFormSchemaAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => DefaultFormSchemaMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => DefaultFormSchemaMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => DefaultFormSchemaSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const DefaultFormSchemaOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaOrderByWithAggregationInput>;
export const DefaultFormSchemaOrderByWithAggregationInputObjectZodSchema = makeSchema();
