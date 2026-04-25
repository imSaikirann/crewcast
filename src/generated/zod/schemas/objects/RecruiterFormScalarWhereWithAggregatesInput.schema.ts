import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumRoleTypeWithAggregatesFilterObjectSchema as EnumRoleTypeWithAggregatesFilterObjectSchema } from './EnumRoleTypeWithAggregatesFilter.schema';
import { RoleTypeSchema } from '../enums/RoleType.schema';
import { EnumExperienceWithAggregatesFilterObjectSchema as EnumExperienceWithAggregatesFilterObjectSchema } from './EnumExperienceWithAggregatesFilter.schema';
import { ExperienceSchema } from '../enums/Experience.schema';
import { EnumWorkModeWithAggregatesFilterObjectSchema as EnumWorkModeWithAggregatesFilterObjectSchema } from './EnumWorkModeWithAggregatesFilter.schema';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { EnumJobStatusWithAggregatesFilterObjectSchema as EnumJobStatusWithAggregatesFilterObjectSchema } from './EnumJobStatusWithAggregatesFilter.schema';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const recruiterformscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RecruiterFormScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RecruiterFormScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecruiterFormScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecruiterFormScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RecruiterFormScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  recruiterId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  domainId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  publicId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  specialization: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  roleType: z.union([z.lazy(() => EnumRoleTypeWithAggregatesFilterObjectSchema), RoleTypeSchema]).optional(),
  experience: z.union([z.lazy(() => EnumExperienceWithAggregatesFilterObjectSchema), ExperienceSchema]).optional(),
  workMode: z.union([z.lazy(() => EnumWorkModeWithAggregatesFilterObjectSchema), WorkModeSchema]).optional(),
  location: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  salaryMin: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  salaryMax: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  currency: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  techStack: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  openings: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  contractDurationMonths: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  showCompanyName: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  status: z.union([z.lazy(() => EnumJobStatusWithAggregatesFilterObjectSchema), JobStatusSchema]).optional(),
  version: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  publishedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  fields: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  reportCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  isFlagged: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  viewCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const RecruiterFormScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RecruiterFormScalarWhereWithAggregatesInput> = recruiterformscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RecruiterFormScalarWhereWithAggregatesInput>;
export const RecruiterFormScalarWhereWithAggregatesInputObjectZodSchema = recruiterformscalarwherewithaggregatesinputSchema;
