import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterUpdateWithoutVerificationInputObjectSchema as RecruiterUpdateWithoutVerificationInputObjectSchema } from './RecruiterUpdateWithoutVerificationInput.schema';
import { RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema as RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema } from './RecruiterUncheckedUpdateWithoutVerificationInput.schema';
import { RecruiterCreateWithoutVerificationInputObjectSchema as RecruiterCreateWithoutVerificationInputObjectSchema } from './RecruiterCreateWithoutVerificationInput.schema';
import { RecruiterUncheckedCreateWithoutVerificationInputObjectSchema as RecruiterUncheckedCreateWithoutVerificationInputObjectSchema } from './RecruiterUncheckedCreateWithoutVerificationInput.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RecruiterUpdateWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterCreateWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutVerificationInputObjectSchema)]),
  where: z.lazy(() => RecruiterWhereInputObjectSchema).optional()
}).strict();
export const RecruiterUpsertWithoutVerificationInputObjectSchema: z.ZodType<Prisma.RecruiterUpsertWithoutVerificationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpsertWithoutVerificationInput>;
export const RecruiterUpsertWithoutVerificationInputObjectZodSchema = makeSchema();
