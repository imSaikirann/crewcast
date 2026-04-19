import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormUpdateWithoutViewsInputObjectSchema as RecruiterFormUpdateWithoutViewsInputObjectSchema } from './RecruiterFormUpdateWithoutViewsInput.schema';
import { RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema as RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutViewsInput.schema';
import { RecruiterFormCreateWithoutViewsInputObjectSchema as RecruiterFormCreateWithoutViewsInputObjectSchema } from './RecruiterFormCreateWithoutViewsInput.schema';
import { RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema as RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutViewsInput.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RecruiterFormUpdateWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema)]),
  where: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormUpsertWithoutViewsInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpsertWithoutViewsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpsertWithoutViewsInput>;
export const RecruiterFormUpsertWithoutViewsInputObjectZodSchema = makeSchema();
