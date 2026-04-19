import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationWhereInputObjectSchema as EmailVerificationWhereInputObjectSchema } from './EmailVerificationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => EmailVerificationWhereInputObjectSchema).optional(),
  some: z.lazy(() => EmailVerificationWhereInputObjectSchema).optional(),
  none: z.lazy(() => EmailVerificationWhereInputObjectSchema).optional()
}).strict();
export const EmailVerificationListRelationFilterObjectSchema: z.ZodType<Prisma.EmailVerificationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationListRelationFilter>;
export const EmailVerificationListRelationFilterObjectZodSchema = makeSchema();
