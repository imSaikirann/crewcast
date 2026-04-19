import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema';
import { RecruiterCreateWithoutVerificationInputObjectSchema as RecruiterCreateWithoutVerificationInputObjectSchema } from './RecruiterCreateWithoutVerificationInput.schema';
import { RecruiterUncheckedCreateWithoutVerificationInputObjectSchema as RecruiterUncheckedCreateWithoutVerificationInputObjectSchema } from './RecruiterUncheckedCreateWithoutVerificationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterCreateWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutVerificationInputObjectSchema)])
}).strict();
export const RecruiterCreateOrConnectWithoutVerificationInputObjectSchema: z.ZodType<Prisma.RecruiterCreateOrConnectWithoutVerificationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateOrConnectWithoutVerificationInput>;
export const RecruiterCreateOrConnectWithoutVerificationInputObjectZodSchema = makeSchema();
