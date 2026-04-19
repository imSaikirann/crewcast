import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const DefaultFormSchemaOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaOrderByRelationAggregateInput>;
export const DefaultFormSchemaOrderByRelationAggregateInputObjectZodSchema = makeSchema();
