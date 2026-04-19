import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutJobReportInputObjectSchema as RecruiterFormCreateWithoutJobReportInputObjectSchema } from './RecruiterFormCreateWithoutJobReportInput.schema';
import { RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema as RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutJobReportInput.schema';
import { RecruiterFormCreateOrConnectWithoutJobReportInputObjectSchema as RecruiterFormCreateOrConnectWithoutJobReportInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutJobReportInput.schema';
import { RecruiterFormUpsertWithoutJobReportInputObjectSchema as RecruiterFormUpsertWithoutJobReportInputObjectSchema } from './RecruiterFormUpsertWithoutJobReportInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateToOneWithWhereWithoutJobReportInputObjectSchema as RecruiterFormUpdateToOneWithWhereWithoutJobReportInputObjectSchema } from './RecruiterFormUpdateToOneWithWhereWithoutJobReportInput.schema';
import { RecruiterFormUpdateWithoutJobReportInputObjectSchema as RecruiterFormUpdateWithoutJobReportInputObjectSchema } from './RecruiterFormUpdateWithoutJobReportInput.schema';
import { RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema as RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutJobReportInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterFormCreateOrConnectWithoutJobReportInputObjectSchema).optional(),
  upsert: z.lazy(() => RecruiterFormUpsertWithoutJobReportInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RecruiterFormUpdateToOneWithWhereWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUpdateWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema)]).optional()
}).strict();
export const RecruiterFormUpdateOneRequiredWithoutJobReportNestedInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateOneRequiredWithoutJobReportNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateOneRequiredWithoutJobReportNestedInput>;
export const RecruiterFormUpdateOneRequiredWithoutJobReportNestedInputObjectZodSchema = makeSchema();
