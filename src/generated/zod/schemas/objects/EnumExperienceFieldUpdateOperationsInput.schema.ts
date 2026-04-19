import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ExperienceSchema } from '../enums/Experience.schema'

const makeSchema = () => z.object({
  set: ExperienceSchema.optional()
}).strict();
export const EnumExperienceFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumExperienceFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumExperienceFieldUpdateOperationsInput>;
export const EnumExperienceFieldUpdateOperationsInputObjectZodSchema = makeSchema();
