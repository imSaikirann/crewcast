import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationCreateWithoutUserInputObjectSchema as EmailVerificationCreateWithoutUserInputObjectSchema } from './EmailVerificationCreateWithoutUserInput.schema';
import { EmailVerificationUncheckedCreateWithoutUserInputObjectSchema as EmailVerificationUncheckedCreateWithoutUserInputObjectSchema } from './EmailVerificationUncheckedCreateWithoutUserInput.schema';
import { EmailVerificationCreateOrConnectWithoutUserInputObjectSchema as EmailVerificationCreateOrConnectWithoutUserInputObjectSchema } from './EmailVerificationCreateOrConnectWithoutUserInput.schema';
import { EmailVerificationCreateManyUserInputEnvelopeObjectSchema as EmailVerificationCreateManyUserInputEnvelopeObjectSchema } from './EmailVerificationCreateManyUserInputEnvelope.schema';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './EmailVerificationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EmailVerificationCreateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => EmailVerificationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EmailVerificationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EmailVerificationCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema), z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const EmailVerificationCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.EmailVerificationCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationCreateNestedManyWithoutUserInput>;
export const EmailVerificationCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
