import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema';
import { RecruiterFormUpdateWithoutJobReportInputObjectSchema as RecruiterFormUpdateWithoutJobReportInputObjectSchema } from './RecruiterFormUpdateWithoutJobReportInput.schema';
import { RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema as RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutJobReportInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RecruiterFormUpdateWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutJobReportInputObjectSchema)])
}).strict();
export const RecruiterFormUpdateToOneWithWhereWithoutJobReportInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateToOneWithWhereWithoutJobReportInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateToOneWithWhereWithoutJobReportInput>;
export const RecruiterFormUpdateToOneWithWhereWithoutJobReportInputObjectZodSchema = makeSchema();
