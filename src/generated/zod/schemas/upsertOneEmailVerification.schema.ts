import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationSelectObjectSchema as EmailVerificationSelectObjectSchema } from './objects/EmailVerificationSelect.schema';
import { EmailVerificationIncludeObjectSchema as EmailVerificationIncludeObjectSchema } from './objects/EmailVerificationInclude.schema';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './objects/EmailVerificationWhereUniqueInput.schema';
import { EmailVerificationCreateInputObjectSchema as EmailVerificationCreateInputObjectSchema } from './objects/EmailVerificationCreateInput.schema';
import { EmailVerificationUncheckedCreateInputObjectSchema as EmailVerificationUncheckedCreateInputObjectSchema } from './objects/EmailVerificationUncheckedCreateInput.schema';
import { EmailVerificationUpdateInputObjectSchema as EmailVerificationUpdateInputObjectSchema } from './objects/EmailVerificationUpdateInput.schema';
import { EmailVerificationUncheckedUpdateInputObjectSchema as EmailVerificationUncheckedUpdateInputObjectSchema } from './objects/EmailVerificationUncheckedUpdateInput.schema';

export const EmailVerificationUpsertOneSchema: z.ZodType<Prisma.EmailVerificationUpsertArgs> = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), where: EmailVerificationWhereUniqueInputObjectSchema, create: z.union([ EmailVerificationCreateInputObjectSchema, EmailVerificationUncheckedCreateInputObjectSchema ]), update: z.union([ EmailVerificationUpdateInputObjectSchema, EmailVerificationUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.EmailVerificationUpsertArgs>;

export const EmailVerificationUpsertOneZodSchema = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), where: EmailVerificationWhereUniqueInputObjectSchema, create: z.union([ EmailVerificationCreateInputObjectSchema, EmailVerificationUncheckedCreateInputObjectSchema ]), update: z.union([ EmailVerificationUpdateInputObjectSchema, EmailVerificationUncheckedUpdateInputObjectSchema ]) }).strict();