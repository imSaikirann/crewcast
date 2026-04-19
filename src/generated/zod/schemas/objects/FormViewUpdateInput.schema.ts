import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecruiterFormUpdateOneRequiredWithoutViewsNestedInputObjectSchema as RecruiterFormUpdateOneRequiredWithoutViewsNestedInputObjectSchema } from './RecruiterFormUpdateOneRequiredWithoutViewsNestedInput.schema'

const makeSchema = () => z.object({
  ip: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  userAgent: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  form: z.lazy(() => RecruiterFormUpdateOneRequiredWithoutViewsNestedInputObjectSchema).optional()
}).strict();
export const FormViewUpdateInputObjectSchema: z.ZodType<Prisma.FormViewUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewUpdateInput>;
export const FormViewUpdateInputObjectZodSchema = makeSchema();
