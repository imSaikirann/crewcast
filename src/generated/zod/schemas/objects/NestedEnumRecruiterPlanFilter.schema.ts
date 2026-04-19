import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema'

const nestedenumrecruiterplanfilterSchema = z.object({
  equals: RecruiterPlanSchema.optional(),
  in: RecruiterPlanSchema.array().optional(),
  notIn: RecruiterPlanSchema.array().optional(),
  not: z.union([RecruiterPlanSchema, z.lazy(() => NestedEnumRecruiterPlanFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumRecruiterPlanFilterObjectSchema: z.ZodType<Prisma.NestedEnumRecruiterPlanFilter> = nestedenumrecruiterplanfilterSchema as unknown as z.ZodType<Prisma.NestedEnumRecruiterPlanFilter>;
export const NestedEnumRecruiterPlanFilterObjectZodSchema = nestedenumrecruiterplanfilterSchema;
