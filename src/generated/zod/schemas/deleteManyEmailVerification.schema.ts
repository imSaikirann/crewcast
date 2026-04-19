import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationWhereInputObjectSchema as EmailVerificationWhereInputObjectSchema } from './objects/EmailVerificationWhereInput.schema';

export const EmailVerificationDeleteManySchema: z.ZodType<Prisma.EmailVerificationDeleteManyArgs> = z.object({ where: EmailVerificationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EmailVerificationDeleteManyArgs>;

export const EmailVerificationDeleteManyZodSchema = z.object({ where: EmailVerificationWhereInputObjectSchema.optional() }).strict();