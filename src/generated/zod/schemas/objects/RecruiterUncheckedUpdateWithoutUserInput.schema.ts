import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { EnumRecruiterPlanFieldUpdateOperationsInputObjectSchema as EnumRecruiterPlanFieldUpdateOperationsInputObjectSchema } from './EnumRecruiterPlanFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecruiterFormUncheckedUpdateManyWithoutRecruiterNestedInputObjectSchema as RecruiterFormUncheckedUpdateManyWithoutRecruiterNestedInputObjectSchema } from './RecruiterFormUncheckedUpdateManyWithoutRecruiterNestedInput.schema';
import { EmailVerificationUncheckedUpdateManyWithoutUserNestedInputObjectSchema as EmailVerificationUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './EmailVerificationUncheckedUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  companyName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  companyEmail: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  website: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  linkedinLink: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  verified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  plan: z.union([RecruiterPlanSchema, z.lazy(() => EnumRecruiterPlanFieldUpdateOperationsInputObjectSchema)]).optional(),
  formLimit: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  activeFormCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalFormsCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalFormsLimit: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  recruiterForms: z.lazy(() => RecruiterFormUncheckedUpdateManyWithoutRecruiterNestedInputObjectSchema).optional(),
  verification: z.lazy(() => EmailVerificationUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const RecruiterUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.RecruiterUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUncheckedUpdateWithoutUserInput>;
export const RecruiterUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();
