import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  email: z.literal(true).optional(),
  tokenHash: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  used: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const EmailVerificationCountAggregateInputObjectSchema: z.ZodType<Prisma.EmailVerificationCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationCountAggregateInputType>;
export const EmailVerificationCountAggregateInputObjectZodSchema = makeSchema();
