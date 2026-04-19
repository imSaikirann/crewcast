import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const RecruiterFormOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterFormOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormOrderByRelationAggregateInput>;
export const RecruiterFormOrderByRelationAggregateInputObjectZodSchema = makeSchema();
