import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './EmailVerificationWhereUniqueInput.schema';
import { EmailVerificationUpdateWithoutUserInputObjectSchema as EmailVerificationUpdateWithoutUserInputObjectSchema } from './EmailVerificationUpdateWithoutUserInput.schema';
import { EmailVerificationUncheckedUpdateWithoutUserInputObjectSchema as EmailVerificationUncheckedUpdateWithoutUserInputObjectSchema } from './EmailVerificationUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EmailVerificationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => EmailVerificationUpdateWithoutUserInputObjectSchema), z.lazy(() => EmailVerificationUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const EmailVerificationUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.EmailVerificationUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationUpdateWithWhereUniqueWithoutUserInput>;
export const EmailVerificationUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
