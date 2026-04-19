import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCreateWithoutVerificationInputObjectSchema as RecruiterCreateWithoutVerificationInputObjectSchema } from './RecruiterCreateWithoutVerificationInput.schema';
import { RecruiterUncheckedCreateWithoutVerificationInputObjectSchema as RecruiterUncheckedCreateWithoutVerificationInputObjectSchema } from './RecruiterUncheckedCreateWithoutVerificationInput.schema';
import { RecruiterCreateOrConnectWithoutVerificationInputObjectSchema as RecruiterCreateOrConnectWithoutVerificationInputObjectSchema } from './RecruiterCreateOrConnectWithoutVerificationInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterCreateWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutVerificationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterCreateOrConnectWithoutVerificationInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterWhereUniqueInputObjectSchema).optional()
}).strict();
export const RecruiterCreateNestedOneWithoutVerificationInputObjectSchema: z.ZodType<Prisma.RecruiterCreateNestedOneWithoutVerificationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateNestedOneWithoutVerificationInput>;
export const RecruiterCreateNestedOneWithoutVerificationInputObjectZodSchema = makeSchema();
