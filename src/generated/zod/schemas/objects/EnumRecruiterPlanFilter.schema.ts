import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { NestedEnumRecruiterPlanFilterObjectSchema as NestedEnumRecruiterPlanFilterObjectSchema } from './NestedEnumRecruiterPlanFilter.schema'

const makeSchema = () => z.object({
  equals: RecruiterPlanSchema.optional(),
  in: RecruiterPlanSchema.array().optional(),
  notIn: RecruiterPlanSchema.array().optional(),
  not: z.union([RecruiterPlanSchema, z.lazy(() => NestedEnumRecruiterPlanFilterObjectSchema)]).optional()
}).strict();
export const EnumRecruiterPlanFilterObjectSchema: z.ZodType<Prisma.EnumRecruiterPlanFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRecruiterPlanFilter>;
export const EnumRecruiterPlanFilterObjectZodSchema = makeSchema();
