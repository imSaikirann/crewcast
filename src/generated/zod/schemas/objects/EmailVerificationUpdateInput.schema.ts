import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { RecruiterUpdateOneRequiredWithoutVerificationNestedInputObjectSchema as RecruiterUpdateOneRequiredWithoutVerificationNestedInputObjectSchema } from './RecruiterUpdateOneRequiredWithoutVerificationNestedInput.schema'

const makeSchema = () => z.object({
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  tokenHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  used: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => RecruiterUpdateOneRequiredWithoutVerificationNestedInputObjectSchema).optional()
}).strict();
export const EmailVerificationUpdateInputObjectSchema: z.ZodType<Prisma.EmailVerificationUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationUpdateInput>;
export const EmailVerificationUpdateInputObjectZodSchema = makeSchema();
