import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterArgsObjectSchema as RecruiterArgsObjectSchema } from './RecruiterArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  email: z.boolean().optional(),
  tokenHash: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  used: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => RecruiterArgsObjectSchema)]).optional()
}).strict();
export const EmailVerificationSelectObjectSchema: z.ZodType<Prisma.EmailVerificationSelect> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationSelect>;
export const EmailVerificationSelectObjectZodSchema = makeSchema();
