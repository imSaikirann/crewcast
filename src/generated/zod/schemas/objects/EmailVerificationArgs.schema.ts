import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationSelectObjectSchema as EmailVerificationSelectObjectSchema } from './EmailVerificationSelect.schema';
import { EmailVerificationIncludeObjectSchema as EmailVerificationIncludeObjectSchema } from './EmailVerificationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EmailVerificationSelectObjectSchema).optional(),
  include: z.lazy(() => EmailVerificationIncludeObjectSchema).optional()
}).strict();
export const EmailVerificationArgsObjectSchema = makeSchema();
export const EmailVerificationArgsObjectZodSchema = makeSchema();
