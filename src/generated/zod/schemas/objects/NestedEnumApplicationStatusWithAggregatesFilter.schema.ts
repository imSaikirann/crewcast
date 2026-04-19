import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumApplicationStatusFilterObjectSchema as NestedEnumApplicationStatusFilterObjectSchema } from './NestedEnumApplicationStatusFilter.schema'

const nestedenumapplicationstatuswithaggregatesfilterSchema = z.object({
  equals: ApplicationStatusSchema.optional(),
  in: ApplicationStatusSchema.array().optional(),
  notIn: ApplicationStatusSchema.array().optional(),
  not: z.union([ApplicationStatusSchema, z.lazy(() => NestedEnumApplicationStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumApplicationStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumApplicationStatusWithAggregatesFilter> = nestedenumapplicationstatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumApplicationStatusWithAggregatesFilter>;
export const NestedEnumApplicationStatusWithAggregatesFilterObjectZodSchema = nestedenumapplicationstatuswithaggregatesfilterSchema;
