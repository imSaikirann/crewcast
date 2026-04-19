import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  email: z.string(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  used: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const EmailVerificationCreateManyUserInputObjectSchema: z.ZodType<Prisma.EmailVerificationCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationCreateManyUserInput>;
export const EmailVerificationCreateManyUserInputObjectZodSchema = makeSchema();
