import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { NestedEnumJobStatusWithAggregatesFilterObjectSchema as NestedEnumJobStatusWithAggregatesFilterObjectSchema } from './NestedEnumJobStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumJobStatusFilterObjectSchema as NestedEnumJobStatusFilterObjectSchema } from './NestedEnumJobStatusFilter.schema'

const makeSchema = () => z.object({
  equals: JobStatusSchema.optional(),
  in: JobStatusSchema.array().optional(),
  notIn: JobStatusSchema.array().optional(),
  not: z.union([JobStatusSchema, z.lazy(() => NestedEnumJobStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumJobStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumJobStatusFilterObjectSchema).optional()
}).strict();
export const EnumJobStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumJobStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumJobStatusWithAggregatesFilter>;
export const EnumJobStatusWithAggregatesFilterObjectZodSchema = makeSchema();
