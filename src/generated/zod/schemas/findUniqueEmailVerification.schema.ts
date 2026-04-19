import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationSelectObjectSchema as EmailVerificationSelectObjectSchema } from './objects/EmailVerificationSelect.schema';
import { EmailVerificationIncludeObjectSchema as EmailVerificationIncludeObjectSchema } from './objects/EmailVerificationInclude.schema';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './objects/EmailVerificationWhereUniqueInput.schema';

export const EmailVerificationFindUniqueSchema: z.ZodType<Prisma.EmailVerificationFindUniqueArgs> = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), where: EmailVerificationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EmailVerificationFindUniqueArgs>;

export const EmailVerificationFindUniqueZodSchema = z.object({ select: EmailVerificationSelectObjectSchema.optional(), include: EmailVerificationIncludeObjectSchema.optional(), where: EmailVerificationWhereUniqueInputObjectSchema }).strict();