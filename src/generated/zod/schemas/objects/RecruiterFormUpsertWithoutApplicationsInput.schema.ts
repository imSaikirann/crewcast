import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormUpdateWithoutApplicationsInputObjectSchema as RecruiterFormUpdateWithoutApplicationsInputObjectSchema } from './RecruiterFormUpdateWithoutApplicationsInput.schema';
import { RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema as RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutApplicationsInput.schema';
import { RecruiterFormCreateWithoutApplicationsInputObjectSchema as RecruiterFormCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateWithoutApplicationsInput.schema';
import { RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema as RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutApplicationsInput.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RecruiterFormUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema)]),
  where: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormUpsertWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpsertWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpsertWithoutApplicationsInput>;
export const RecruiterFormUpsertWithoutApplicationsInputObjectZodSchema = makeSchema();
