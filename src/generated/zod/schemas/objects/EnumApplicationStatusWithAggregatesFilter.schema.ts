import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { NestedEnumApplicationStatusWithAggregatesFilterObjectSchema as NestedEnumApplicationStatusWithAggregatesFilterObjectSchema } from './NestedEnumApplicationStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumApplicationStatusFilterObjectSchema as NestedEnumApplicationStatusFilterObjectSchema } from './NestedEnumApplicationStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ApplicationStatusSchema.optional(),
  in: ApplicationStatusSchema.array().optional(),
  notIn: ApplicationStatusSchema.array().optional(),
  not: z.union([ApplicationStatusSchema, z.lazy(() => NestedEnumApplicationStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional()
}).strict();
export const EnumApplicationStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumApplicationStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumApplicationStatusWithAggregatesFilter>;
export const EnumApplicationStatusWithAggregatesFilterObjectZodSchema = makeSchema();
