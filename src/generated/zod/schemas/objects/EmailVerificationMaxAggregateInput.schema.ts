import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  email: z.literal(true).optional(),
  tokenHash: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  used: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const EmailVerificationMaxAggregateInputObjectSchema: z.ZodType<Prisma.EmailVerificationMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationMaxAggregateInputType>;
export const EmailVerificationMaxAggregateInputObjectZodSchema = makeSchema();
