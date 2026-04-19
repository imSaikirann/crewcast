import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  tokenHash: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const EmailVerificationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EmailVerificationCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationCountOrderByAggregateInput>;
export const EmailVerificationCountOrderByAggregateInputObjectZodSchema = makeSchema();
