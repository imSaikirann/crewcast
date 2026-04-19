import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationSelectObjectSchema as EmailVerificationSelectObjectSchema } from './objects/EmailVerificationSelect.schema';
import { EmailVerificationIncludeObjectSchema as EmailVerificationIncludeObjectSchema } from './objects/EmailVerificationInclude.schema';
import { EmailVerificationCreateInputObjectSchema as EmailVerificationCreateInputObjectSchema } from './objects/EmailVerificationCreateInput.schema';
import { EmailVerificationUncheckedCreateInputObjectSchema as EmailVerificationUncheckedCreateInputObjectSchema } from './objects/EmailVerificationUncheckedCreateInput.schema';

export const EmailVerificationCreateOneSchema: z.ZodType<Prisma.EmailVerificationCreateArgs> = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), data: z.union([EmailVerificationCreateInputObjectSchema, EmailVerificationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.EmailVerificationCreateArgs>;

export const EmailVerificationCreateOneZodSchema = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), data: z.union([EmailVerificationCreateInputObjectSchema, EmailVerificationUncheckedCreateInputObjectSchema]) }).strict();