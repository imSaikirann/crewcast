import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  version: SortOrderSchema.optional()
}).strict();
export const DefaultFormSchemaAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaAvgOrderByAggregateInput>;
export const DefaultFormSchemaAvgOrderByAggregateInputObjectZodSchema = makeSchema();
