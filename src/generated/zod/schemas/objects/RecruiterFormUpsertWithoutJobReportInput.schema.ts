import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormUpdateWithoutJobReportInputObjectSchema as RecruiterFormUpdateWithoutJobReportInputObjectSchema } from './RecruiterFormUpdateWithoutJobReportInput.schema';
import { RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema as RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutJobReportInput.schema';
import { RecruiterFormCreateWithoutJobReportInputObjectSchema as RecruiterFormCreateWithoutJobReportInputObjectSchema } from './RecruiterFormCreateWithoutJobReportInput.schema';
import { RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema as RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutJobReportInput.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RecruiterFormUpdateWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema)]),
  where: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormUpsertWithoutJobReportInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpsertWithoutJobReportInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpsertWithoutJobReportInput>;
export const RecruiterFormUpsertWithoutJobReportInputObjectZodSchema = makeSchema();
