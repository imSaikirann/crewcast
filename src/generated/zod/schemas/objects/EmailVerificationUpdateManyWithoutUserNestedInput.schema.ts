import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationCreateWithoutUserInputObjectSchema as EmailVerificationCreateWithoutUserInputObjectSchema } from './EmailVerificationCreateWithoutUserInput.schema';
import { EmailVerificationUncheckedCreateWithoutUserInputObjectSchema as EmailVerificationUncheckedCreateWithoutUserInputObjectSchema } from './EmailVerificationUncheckedCreateWithoutUserInput.schema';
import { EmailVerificationCreateOrConnectWithoutUserInputObjectSchema as EmailVerificationCreateOrConnectWithoutUserInputObjectSchema } from './EmailVerificationCreateOrConnectWithoutUserInput.schema';
import { EmailVerificationUpsertWithWhereUniqueWithoutUserInputObjectSchema as EmailVerificationUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './EmailVerificationUpsertWithWhereUniqueWithoutUserInput.schema';
import { EmailVerificationCreateManyUserInputEnvelopeObjectSchema as EmailVerificationCreateManyUserInputEnvelopeObjectSchema } from './EmailVerificationCreateManyUserInputEnvelope.schema';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './EmailVerificationWhereUniqueInput.schema';
import { EmailVerificationUpdateWithWhereUniqueWithoutUserInputObjectSchema as EmailVerificationUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './EmailVerificationUpdateWithWhereUniqueWithoutUserInput.schema';
import { EmailVerificationUpdateManyWithWhereWithoutUserInputObjectSchema as EmailVerificationUpdateManyWithWhereWithoutUserInputObjectSchema } from './EmailVerificationUpdateManyWithWhereWithoutUserInput.schema';
import { EmailVerificationScalarWhereInputObjectSchema as EmailVerificationScalarWhereInputObjectSchema } from './EmailVerificationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EmailVerificationCreateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => EmailVerificationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EmailVerificationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => EmailVerificationUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EmailVerificationCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema), z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema), z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema), z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema), z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => EmailVerificationUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => EmailVerificationUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => EmailVerificationScalarWhereInputObjectSchema), z.lazy(() => EmailVerificationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const EmailVerificationUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.EmailVerificationUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationUpdateManyWithoutUserNestedInput>;
export const EmailVerificationUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
