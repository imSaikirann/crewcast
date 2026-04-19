import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './EmailVerificationWhereUniqueInput.schema';
import { EmailVerificationUpdateWithoutUserInputObjectSchema as EmailVerificationUpdateWithoutUserInputObjectSchema } from './EmailVerificationUpdateWithoutUserInput.schema';
import { EmailVerificationUncheckedUpdateWithoutUserInputObjectSchema as EmailVerificationUncheckedUpdateWithoutUserInputObjectSchema } from './EmailVerificationUncheckedUpdateWithoutUserInput.schema';
import { EmailVerificationCreateWithoutUserInputObjectSchema as EmailVerificationCreateWithoutUserInputObjectSchema } from './EmailVerificationCreateWithoutUserInput.schema';
import { EmailVerificationUncheckedCreateWithoutUserInputObjectSchema as EmailVerificationUncheckedCreateWithoutUserInputObjectSchema } from './EmailVerificationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => EmailVerificationUpdateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => EmailVerificationCreateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const EmailVerificationUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.EmailVerificationUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationUpsertWithWhereUniqueWithoutUserInput>;
export const EmailVerificationUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
