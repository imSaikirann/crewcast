import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ExperienceSchema } from '../enums/Experience.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumExperienceFilterObjectSchema as NestedEnumExperienceFilterObjectSchema } from './NestedEnumExperienceFilter.schema'

const nestedenumexperiencewithaggregatesfilterSchema = z.object({
  equals: ExperienceSchema.optional(),
  in: ExperienceSchema.array().optional(),
  notIn: ExperienceSchema.array().optional(),
  not: z.union([ExperienceSchema, z.lazy(() => NestedEnumExperienceWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumExperienceFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumExperienceFilterObjectSchema).optional()
}).strict();
export const NestedEnumExperienceWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumExperienceWithAggregatesFilter> = nestedenumexperiencewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumExperienceWithAggregatesFilter>;
export const NestedEnumExperienceWithAggregatesFilterObjectZodSchema = nestedenumexperiencewithaggregatesfilterSchema;
