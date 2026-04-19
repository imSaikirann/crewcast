import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationSelectObjectSchema as EmailVerificationSelectObjectSchema } from './objects/EmailVerificationSelect.schema';
import { EmailVerificationIncludeObjectSchema as EmailVerificationIncludeObjectSchema } from './objects/EmailVerificationInclude.schema';
import { EmailVerificationUpdateInputObjectSchema as EmailVerificationUpdateInputObjectSchema } from './objects/EmailVerificationUpdateInput.schema';
import { EmailVerificationUncheckedUpdateInputObjectSchema as EmailVerificationUncheckedUpdateInputObjectSchema } from './objects/EmailVerificationUncheckedUpdateInput.schema';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './objects/EmailVerificationWhereUniqueInput.schema';

export const EmailVerificationUpdateOneSchema: z.ZodType<Prisma.EmailVerificationUpdateArgs> = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), data: z.union([EmailVerificationUpdateInputObjectSchema, EmailVerificationUncheckedUpdateInputObjectSchema]), where: EmailVerificationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EmailVerificationUpdateArgs>;

export const EmailVerificationUpdateOneZodSchema = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), data: z.union([EmailVerificationUpdateInputObjectSchema, EmailVerificationUncheckedUpdateInputObjectSchema]), where: EmailVerificationWhereUniqueInputObjectSchema }).strict();