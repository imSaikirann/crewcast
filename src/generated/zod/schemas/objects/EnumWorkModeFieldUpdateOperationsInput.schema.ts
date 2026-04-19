import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WorkModeSchema } from '../enums/WorkMode.schema'

const makeSchema = () => z.object({
  set: WorkModeSchema.optional()
}).strict();
export const EnumWorkModeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumWorkModeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumWorkModeFieldUpdateOperationsInput>;
export const EnumWorkModeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
