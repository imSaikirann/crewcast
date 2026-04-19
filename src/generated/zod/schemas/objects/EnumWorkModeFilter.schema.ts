import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { NestedEnumWorkModeFilterObjectSchema as NestedEnumWorkModeFilterObjectSchema } from './NestedEnumWorkModeFilter.schema'

const makeSchema = () => z.object({
  equals: WorkModeSchema.optional(),
  in: WorkModeSchema.array().optional(),
  notIn: WorkModeSchema.array().optional(),
  not: z.union([WorkModeSchema, z.lazy(() => NestedEnumWorkModeFilterObjectSchema)]).optional()
}).strict();
export const EnumWorkModeFilterObjectSchema: z.ZodType<Prisma.EnumWorkModeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumWorkModeFilter>;
export const EnumWorkModeFilterObjectZodSchema = makeSchema();
