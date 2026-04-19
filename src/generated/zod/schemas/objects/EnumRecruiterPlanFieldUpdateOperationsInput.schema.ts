import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema'

const makeSchema = () => z.object({
  set: RecruiterPlanSchema.optional()
}).strict();
export const EnumRecruiterPlanFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumRecruiterPlanFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumRecruiterPlanFieldUpdateOperationsInput>;
export const EnumRecruiterPlanFieldUpdateOperationsInputObjectZodSchema = makeSchema();
