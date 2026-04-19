import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { EnumRecruiterPlanFilterObjectSchema as EnumRecruiterPlanFilterObjectSchema } from './EnumRecruiterPlanFilter.schema';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { RecruiterFormListRelationFilterObjectSchema as RecruiterFormListRelationFilterObjectSchema } from './RecruiterFormListRelationFilter.schema';
import { EmailVerificationListRelationFilterObjectSchema as EmailVerificationListRelationFilterObjectSchema } from './EmailVerificationListRelationFilter.schema'

const recruiterwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RecruiterWhereInputObjectSchema), z.lazy(() => RecruiterWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecruiterWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecruiterWhereInputObjectSchema), z.lazy(() => RecruiterWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  companyName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  companyEmail: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  website: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  linkedinLink: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  verified: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  plan: z.union([z.lazy(() => EnumRecruiterPlanFilterObjectSchema), RecruiterPlanSchema]).optional(),
  formLimit: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  activeFormCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  totalFormsCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  totalFormsLimit: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  recruiterForms: z.lazy(() => RecruiterFormListRelationFilterObjectSchema).optional(),
  verification: z.lazy(() => EmailVerificationListRelationFilterObjectSchema).optional()
}).strict();
export const RecruiterWhereInputObjectSchema: z.ZodType<Prisma.RecruiterWhereInput> = recruiterwhereinputSchema as unknown as z.ZodType<Prisma.RecruiterWhereInput>;
export const RecruiterWhereInputObjectZodSchema = recruiterwhereinputSchema;
