import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecruiterFormUpdateOneRequiredWithoutJobReportNestedInputObjectSchema as RecruiterFormUpdateOneRequiredWithoutJobReportNestedInputObjectSchema } from './RecruiterFormUpdateOneRequiredWithoutJobReportNestedInput.schema'

const makeSchema = () => z.object({
  reason: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  message: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  ip: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  userAgent: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  form: z.lazy(() => RecruiterFormUpdateOneRequiredWithoutJobReportNestedInputObjectSchema).optional()
}).strict();
export const JobReportUpdateInputObjectSchema: z.ZodType<Prisma.JobReportUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportUpdateInput>;
export const JobReportUpdateInputObjectZodSchema = makeSchema();
