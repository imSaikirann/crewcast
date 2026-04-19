import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecruiterOrderByWithRelationInputObjectSchema as RecruiterOrderByWithRelationInputObjectSchema } from './RecruiterOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  tokenHash: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => RecruiterOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const EmailVerificationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EmailVerificationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationOrderByWithRelationInput>;
export const EmailVerificationOrderByWithRelationInputObjectZodSchema = makeSchema();
