import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationUpdateManyMutationInputObjectSchema as EmailVerificationUpdateManyMutationInputObjectSchema } from './objects/EmailVerificationUpdateManyMutationInput.schema';
import { EmailVerificationWhereInputObjectSchema as EmailVerificationWhereInputObjectSchema } from './objects/EmailVerificationWhereInput.schema';

export const EmailVerificationUpdateManySchema: z.ZodType<Prisma.EmailVerificationUpdateManyArgs> = z.object({ data: EmailVerificationUpdateManyMutationInputObjectSchema, where: EmailVerificationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EmailVerificationUpdateManyArgs>;

export const EmailVerificationUpdateManyZodSchema = z.object({ data: EmailVerificationUpdateManyMutationInputObjectSchema, where: EmailVerificationWhereInputObjectSchema.optional() }).strict();