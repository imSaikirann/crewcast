import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationScalarWhereInputObjectSchema as EmailVerificationScalarWhereInputObjectSchema } from './EmailVerificationScalarWhereInput.schema';
import { EmailVerificationUpdateManyMutationInputObjectSchema as EmailVerificationUpdateManyMutationInputObjectSchema } from './EmailVerificationUpdateManyMutationInput.schema';
import { EmailVerificationUncheckedUpdateManyWithoutUserInputObjectSchema as EmailVerificationUncheckedUpdateManyWithoutUserInputObjectSchema } from './EmailVerificationUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EmailVerificationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => EmailVerificationUpdateManyMutationInputObjectSchema), z.lazy(() => EmailVerificationUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const EmailVerificationUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.EmailVerificationUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationUpdateManyWithWhereWithoutUserInput>;
export const EmailVerificationUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
