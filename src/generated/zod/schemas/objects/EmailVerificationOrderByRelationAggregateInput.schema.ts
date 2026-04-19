import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const EmailVerificationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.EmailVerificationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationOrderByRelationAggregateInput>;
export const EmailVerificationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
