import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutJobReportInputObjectSchema as RecruiterFormCreateWithoutJobReportInputObjectSchema } from './RecruiterFormCreateWithoutJobReportInput.schema';
import { RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema as RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutJobReportInput.schema';
import { RecruiterFormCreateOrConnectWithoutJobReportInputObjectSchema as RecruiterFormCreateOrConnectWithoutJobReportInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutJobReportInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutJobReportInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutJobReportInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterFormCreateOrConnectWithoutJobReportInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).optional()
}).strict();
export const RecruiterFormCreateNestedOneWithoutJobReportInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateNestedOneWithoutJobReportInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateNestedOneWithoutJobReportInput>;
export const RecruiterFormCreateNestedOneWithoutJobReportInputObjectZodSchema = makeSchema();
