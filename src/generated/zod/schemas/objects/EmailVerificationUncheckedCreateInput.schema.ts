import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  userId: z.string().max(24),
  email: z.string(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  used: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const EmailVerificationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.EmailVerificationUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationUncheckedCreateInput>;
export const EmailVerificationUncheckedCreateInputObjectZodSchema = makeSchema();
