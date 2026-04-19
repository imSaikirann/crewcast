import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { EnumRecruiterPlanFieldUpdateOperationsInputObjectSchema as EnumRecruiterPlanFieldUpdateOperationsInputObjectSchema } from './EnumRecruiterPlanFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutRecruiterNestedInputObjectSchema as UserUpdateOneRequiredWithoutRecruiterNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRecruiterNestedInput.schema';
import { EmailVerificationUpdateManyWithoutUserNestedInputObjectSchema as EmailVerificationUpdateManyWithoutUserNestedInputObjectSchema } from './EmailVerificationUpdateManyWithoutUserNestedInput.schema'

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
  user: z.lazy(() => UserUpdateOneRequiredWithoutRecruiterNestedInputObjectSchema).optional(),
  verification: z.lazy(() => EmailVerificationUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const RecruiterUpdateWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.RecruiterUpdateWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpdateWithoutRecruiterFormsInput>;
export const RecruiterUpdateWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
