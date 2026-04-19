import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  jobCount: SortOrderSchema.optional()
}).strict();
export const DomainsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DomainsSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsSumOrderByAggregateInput>;
export const DomainsSumOrderByAggregateInputObjectZodSchema = makeSchema();
