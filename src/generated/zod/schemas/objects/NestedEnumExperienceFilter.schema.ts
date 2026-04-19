import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ExperienceSchema } from '../enums/Experience.schema'

const nestedenumexperiencefilterSchema = z.object({
  equals: ExperienceSchema.optional(),
  in: ExperienceSchema.array().optional(),
  notIn: ExperienceSchema.array().optional(),
  not: z.union([ExperienceSchema, z.lazy(() => NestedEnumExperienceFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumExperienceFilterObjectSchema: z.ZodType<Prisma.NestedEnumExperienceFilter> = nestedenumexperiencefilterSchema as unknown as z.ZodType<Prisma.NestedEnumExperienceFilter>;
export const NestedEnumExperienceFilterObjectZodSchema = nestedenumexperiencefilterSchema;
