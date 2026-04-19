import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumWorkModeFilterObjectSchema as NestedEnumWorkModeFilterObjectSchema } from './NestedEnumWorkModeFilter.schema'

const nestedenumworkmodewithaggregatesfilterSchema = z.object({
  equals: WorkModeSchema.optional(),
  in: WorkModeSchema.array().optional(),
  notIn: WorkModeSchema.array().optional(),
  not: z.union([WorkModeSchema, z.lazy(() => NestedEnumWorkModeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkModeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkModeFilterObjectSchema).optional()
}).strict();
export const NestedEnumWorkModeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumWorkModeWithAggregatesFilter> = nestedenumworkmodewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumWorkModeWithAggregatesFilter>;
export const NestedEnumWorkModeWithAggregatesFilterObjectZodSchema = nestedenumworkmodewithaggregatesfilterSchema;
