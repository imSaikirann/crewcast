import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterUpdateWithoutUserInputObjectSchema as RecruiterUpdateWithoutUserInputObjectSchema } from './RecruiterUpdateWithoutUserInput.schema';
import { RecruiterUncheckedUpdateWithoutUserInputObjectSchema as RecruiterUncheckedUpdateWithoutUserInputObjectSchema } from './RecruiterUncheckedUpdateWithoutUserInput.schema';
import { RecruiterCreateWithoutUserInputObjectSchema as RecruiterCreateWithoutUserInputObjectSchema } from './RecruiterCreateWithoutUserInput.schema';
import { RecruiterUncheckedCreateWithoutUserInputObjectSchema as RecruiterUncheckedCreateWithoutUserInputObjectSchema } from './RecruiterUncheckedCreateWithoutUserInput.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RecruiterUpdateWithoutUserInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterCreateWithoutUserInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutUserInputObjectSchema)]),
  where: z.lazy(() => RecruiterWhereInputObjectSchema).optional()
}).strict();
export const RecruiterUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.RecruiterUpsertWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpsertWithoutUserInput>;
export const RecruiterUpsertWithoutUserInputObjectZodSchema = makeSchema();
