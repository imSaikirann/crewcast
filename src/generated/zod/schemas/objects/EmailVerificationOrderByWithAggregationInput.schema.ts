import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { EmailVerificationCountOrderByAggregateInputObjectSchema as EmailVerificationCountOrderByAggregateInputObjectSchema } from './EmailVerificationCountOrderByAggregateInput.schema';
import { EmailVerificationMaxOrderByAggregateInputObjectSchema as EmailVerificationMaxOrderByAggregateInputObjectSchema } from './EmailVerificationMaxOrderByAggregateInput.schema';
import { EmailVerificationMinOrderByAggregateInputObjectSchema as EmailVerificationMinOrderByAggregateInputObjectSchema } from './EmailVerificationMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  tokenHash: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => EmailVerificationCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => EmailVerificationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => EmailVerificationMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const EmailVerificationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.EmailVerificationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationOrderByWithAggregationInput>;
export const EmailVerificationOrderByWithAggregationInputObjectZodSchema = makeSchema();
