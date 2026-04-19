import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const FormFieldOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.FormFieldOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldOrderByRelationAggregateInput>;
export const FormFieldOrderByRelationAggregateInputObjectZodSchema = makeSchema();
