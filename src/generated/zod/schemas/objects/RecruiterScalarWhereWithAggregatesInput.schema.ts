import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { EnumRecruiterPlanWithAggregatesFilterObjectSchema as EnumRecruiterPlanWithAggregatesFilterObjectSchema } from './EnumRecruiterPlanWithAggregatesFilter.schema';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const recruiterscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RecruiterScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RecruiterScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecruiterScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecruiterScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RecruiterScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  companyName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  companyEmail: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  website: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  linkedinLink: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  verified: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  plan: z.union([z.lazy(() => EnumRecruiterPlanWithAggregatesFilterObjectSchema), RecruiterPlanSchema]).optional(),
  formLimit: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  activeFormCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  totalFormsCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  totalFormsLimit: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const RecruiterScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RecruiterScalarWhereWithAggregatesInput> = recruiterscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RecruiterScalarWhereWithAggregatesInput>;
export const RecruiterScalarWhereWithAggregatesInputObjectZodSchema = recruiterscalarwherewithaggregatesinputSchema;
