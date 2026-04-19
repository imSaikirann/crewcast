import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { RecruiterScalarRelationFilterObjectSchema as RecruiterScalarRelationFilterObjectSchema } from './RecruiterScalarRelationFilter.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema'

const emailverificationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EmailVerificationWhereInputObjectSchema), z.lazy(() => EmailVerificationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EmailVerificationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EmailVerificationWhereInputObjectSchema), z.lazy(() => EmailVerificationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  tokenHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  used: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => RecruiterScalarRelationFilterObjectSchema), z.lazy(() => RecruiterWhereInputObjectSchema)]).optional()
}).strict();
export const EmailVerificationWhereInputObjectSchema: z.ZodType<Prisma.EmailVerificationWhereInput> = emailverificationwhereinputSchema as unknown as z.ZodType<Prisma.EmailVerificationWhereInput>;
export const EmailVerificationWhereInputObjectZodSchema = emailverificationwhereinputSchema;
