import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema'

const emailverificationscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EmailVerificationScalarWhereInputObjectSchema), z.lazy(() => EmailVerificationScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EmailVerificationScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EmailVerificationScalarWhereInputObjectSchema), z.lazy(() => EmailVerificationScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  tokenHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  used: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EmailVerificationScalarWhereInputObjectSchema: z.ZodType<Prisma.EmailVerificationScalarWhereInput> = emailverificationscalarwhereinputSchema as unknown as z.ZodType<Prisma.EmailVerificationScalarWhereInput>;
export const EmailVerificationScalarWhereInputObjectZodSchema = emailverificationscalarwhereinputSchema;
