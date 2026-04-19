import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCreateNestedOneWithoutVerificationInputObjectSchema as RecruiterCreateNestedOneWithoutVerificationInputObjectSchema } from './RecruiterCreateNestedOneWithoutVerificationInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  email: z.string(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  used: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => RecruiterCreateNestedOneWithoutVerificationInputObjectSchema)
}).strict();
export const EmailVerificationCreateInputObjectSchema: z.ZodType<Prisma.EmailVerificationCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationCreateInput>;
export const EmailVerificationCreateInputObjectZodSchema = makeSchema();
