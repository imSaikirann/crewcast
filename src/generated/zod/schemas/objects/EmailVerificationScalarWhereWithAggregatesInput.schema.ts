import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema'

const emailverificationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EmailVerificationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  tokenHash: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  used: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EmailVerificationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.EmailVerificationScalarWhereWithAggregatesInput> = emailverificationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.EmailVerificationScalarWhereWithAggregatesInput>;
export const EmailVerificationScalarWhereWithAggregatesInputObjectZodSchema = emailverificationscalarwherewithaggregatesinputSchema;
