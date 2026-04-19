import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WorkModeSchema } from '../enums/WorkMode.schema'

const nestedenumworkmodefilterSchema = z.object({
  equals: WorkModeSchema.optional(),
  in: WorkModeSchema.array().optional(),
  notIn: WorkModeSchema.array().optional(),
  not: z.union([WorkModeSchema, z.lazy(() => NestedEnumWorkModeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumWorkModeFilterObjectSchema: z.ZodType<Prisma.NestedEnumWorkModeFilter> = nestedenumworkmodefilterSchema as unknown as z.ZodType<Prisma.NestedEnumWorkModeFilter>;
export const NestedEnumWorkModeFilterObjectZodSchema = nestedenumworkmodefilterSchema;
