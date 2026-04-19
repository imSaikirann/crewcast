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
export const EmailVerificationMinAggregateInputObjectSchema: z.ZodType<Prisma.EmailVerificationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationMinAggregateInputType>;
export const EmailVerificationMinAggregateInputObjectZodSchema = makeSchema();
