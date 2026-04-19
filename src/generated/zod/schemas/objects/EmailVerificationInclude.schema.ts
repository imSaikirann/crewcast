import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterArgsObjectSchema as RecruiterArgsObjectSchema } from './RecruiterArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => RecruiterArgsObjectSchema)]).optional()
}).strict();
export const EmailVerificationIncludeObjectSchema: z.ZodType<Prisma.EmailVerificationInclude> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationInclude>;
export const EmailVerificationIncludeObjectZodSchema = makeSchema();
