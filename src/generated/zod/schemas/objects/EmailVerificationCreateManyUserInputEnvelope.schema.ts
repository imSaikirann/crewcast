import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationCreateManyUserInputObjectSchema as EmailVerificationCreateManyUserInputObjectSchema } from './EmailVerificationCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => EmailVerificationCreateManyUserInputObjectSchema), z.lazy(() => EmailVerificationCreateManyUserInputObjectSchema).array()])
}).strict();
export const EmailVerificationCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.EmailVerificationCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationCreateManyUserInputEnvelope>;
export const EmailVerificationCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
