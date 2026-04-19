import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { NestedEnumWorkModeWithAggregatesFilterObjectSchema as NestedEnumWorkModeWithAggregatesFilterObjectSchema } from './NestedEnumWorkModeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumWorkModeFilterObjectSchema as NestedEnumWorkModeFilterObjectSchema } from './NestedEnumWorkModeFilter.schema'

const makeSchema = () => z.object({
  equals: WorkModeSchema.optional(),
  in: WorkModeSchema.array().optional(),
  notIn: WorkModeSchema.array().optional(),
  not: z.union([WorkModeSchema, z.lazy(() => NestedEnumWorkModeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkModeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkModeFilterObjectSchema).optional()
}).strict();
export const EnumWorkModeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumWorkModeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumWorkModeWithAggregatesFilter>;
export const EnumWorkModeWithAggregatesFilterObjectZodSchema = makeSchema();
