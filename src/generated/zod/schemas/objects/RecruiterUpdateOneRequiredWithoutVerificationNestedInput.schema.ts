import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCreateWithoutVerificationInputObjectSchema as RecruiterCreateWithoutVerificationInputObjectSchema } from './RecruiterCreateWithoutVerificationInput.schema';
import { RecruiterUncheckedCreateWithoutVerificationInputObjectSchema as RecruiterUncheckedCreateWithoutVerificationInputObjectSchema } from './RecruiterUncheckedCreateWithoutVerificationInput.schema';
import { RecruiterCreateOrConnectWithoutVerificationInputObjectSchema as RecruiterCreateOrConnectWithoutVerificationInputObjectSchema } from './RecruiterCreateOrConnectWithoutVerificationInput.schema';
import { RecruiterUpsertWithoutVerificationInputObjectSchema as RecruiterUpsertWithoutVerificationInputObjectSchema } from './RecruiterUpsertWithoutVerificationInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema';
import { RecruiterUpdateToOneWithWhereWithoutVerificationInputObjectSchema as RecruiterUpdateToOneWithWhereWithoutVerificationInputObjectSchema } from './RecruiterUpdateToOneWithWhereWithoutVerificationInput.schema';
import { RecruiterUpdateWithoutVerificationInputObjectSchema as RecruiterUpdateWithoutVerificationInputObjectSchema } from './RecruiterUpdateWithoutVerificationInput.schema';
import { RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema as RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema } from './RecruiterUncheckedUpdateWithoutVerificationInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterCreateWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutVerificationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterCreateOrConnectWithoutVerificationInputObjectSchema).optional(),
  upsert: z.lazy(() => RecruiterUpsertWithoutVerificationInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RecruiterUpdateToOneWithWhereWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUpdateWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema)]).optional()
}).strict();
export const RecruiterUpdateOneRequiredWithoutVerificationNestedInputObjectSchema: z.ZodType<Prisma.RecruiterUpdateOneRequiredWithoutVerificationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpdateOneRequiredWithoutVerificationNestedInput>;
export const RecruiterUpdateOneRequiredWithoutVerificationNestedInputObjectZodSchema = makeSchema();
