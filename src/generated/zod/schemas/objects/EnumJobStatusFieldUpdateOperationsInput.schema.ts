import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from '../enums/JobStatus.schema'

const makeSchema = () => z.object({
  set: JobStatusSchema.optional()
}).strict();
export const EnumJobStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumJobStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumJobStatusFieldUpdateOperationsInput>;
export const EnumJobStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
