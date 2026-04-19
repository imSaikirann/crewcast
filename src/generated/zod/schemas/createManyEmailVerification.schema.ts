import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationCreateManyInputObjectSchema as EmailVerificationCreateManyInputObjectSchema } from './objects/EmailVerificationCreateManyInput.schema';

export const EmailVerificationCreateManySchema: z.ZodType<Prisma.EmailVerificationCreateManyArgs> = z.object({ data: z.union([ EmailVerificationCreateManyInputObjectSchema, z.array(EmailVerificationCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.EmailVerificationCreateManyArgs>;

export const EmailVerificationCreateManyZodSchema = z.object({ data: z.union([ EmailVerificationCreateManyInputObjectSchema, z.array(EmailVerificationCreateManyInputObjectSchema) ]),  }).strict();