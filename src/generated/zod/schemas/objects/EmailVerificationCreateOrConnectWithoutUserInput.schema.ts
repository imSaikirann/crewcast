import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './EmailVerificationWhereUniqueInput.schema';
import { EmailVerificationCreateWithoutUserInputObjectSchema as EmailVerificationCreateWithoutUserInputObjectSchema } from './EmailVerificationCreateWithoutUserInput.schema';
import { EmailVerificationUncheckedCreateWithoutUserInputObjectSchema as EmailVerificationUncheckedCreateWithoutUserInputObjectSchema } from './EmailVerificationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EmailVerificationCreateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const EmailVerificationCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.EmailVerificationCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationCreateOrConnectWithoutUserInput>;
export const EmailVerificationCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
