import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { NestedEnumRecruiterPlanWithAggregatesFilterObjectSchema as NestedEnumRecruiterPlanWithAggregatesFilterObjectSchema } from './NestedEnumRecruiterPlanWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRecruiterPlanFilterObjectSchema as NestedEnumRecruiterPlanFilterObjectSchema } from './NestedEnumRecruiterPlanFilter.schema'

const makeSchema = () => z.object({
  equals: RecruiterPlanSchema.optional(),
  in: RecruiterPlanSchema.array().optional(),
  notIn: RecruiterPlanSchema.array().optional(),
  not: z.union([RecruiterPlanSchema, z.lazy(() => NestedEnumRecruiterPlanWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRecruiterPlanFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRecruiterPlanFilterObjectSchema).optional()
}).strict();
export const EnumRecruiterPlanWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumRecruiterPlanWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRecruiterPlanWithAggregatesFilter>;
export const EnumRecruiterPlanWithAggregatesFilterObjectZodSchema = makeSchema();
