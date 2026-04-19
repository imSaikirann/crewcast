import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema'

const makeSchema = () => z.object({
  set: ApplicationStatusSchema.optional()
}).strict();
export const EnumApplicationStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumApplicationStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumApplicationStatusFieldUpdateOperationsInput>;
export const EnumApplicationStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
