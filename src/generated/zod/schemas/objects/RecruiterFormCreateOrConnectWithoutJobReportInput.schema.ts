import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormCreateWithoutJobReportInputObjectSchema as RecruiterFormCreateWithoutJobReportInputObjectSchema } from './RecruiterFormCreateWithoutJobReportInput.schema';
import { RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema as RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutJobReportInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema)])
}).strict();
export const RecruiterFormCreateOrConnectWithoutJobReportInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutJobReportInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutJobReportInput>;
export const RecruiterFormCreateOrConnectWithoutJobReportInputObjectZodSchema = makeSchema();
