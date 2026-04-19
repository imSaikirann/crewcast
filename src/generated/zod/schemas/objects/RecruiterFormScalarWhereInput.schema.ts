import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumRoleTypeFilterObjectSchema as EnumRoleTypeFilterObjectSchema } from './EnumRoleTypeFilter.schema';
import { RoleTypeSchema } from '../enums/RoleType.schema';
import { EnumExperienceFilterObjectSchema as EnumExperienceFilterObjectSchema } from './EnumExperienceFilter.schema';
import { ExperienceSchema } from '../enums/Experience.schema';
import { EnumWorkModeFilterObjectSchema as EnumWorkModeFilterObjectSchema } from './EnumWorkModeFilter.schema';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { EnumJobStatusFilterObjectSchema as EnumJobStatusFilterObjectSchema } from './EnumJobStatusFilter.schema';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const recruiterformscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RecruiterFormScalarWhereInputObjectSchema), z.lazy(() => RecruiterFormScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecruiterFormScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecruiterFormScalarWhereInputObjectSchema), z.lazy(() => RecruiterFormScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  recruiterId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  domainId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  publicId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  specialization: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  roleType: z.union([z.lazy(() => EnumRoleTypeFilterObjectSchema), RoleTypeSchema]).optional(),
  experience: z.union([z.lazy(() => EnumExperienceFilterObjectSchema), ExperienceSchema]).optional(),
  workMode: z.union([z.lazy(() => EnumWorkModeFilterObjectSchema), WorkModeSchema]).optional(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  salaryMin: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  salaryMax: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  currency: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  techStack: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  contractDurationMonths: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  showCompanyName: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  status: z.union([z.lazy(() => EnumJobStatusFilterObjectSchema), JobStatusSchema]).optional(),
  version: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  publishedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  fields: z.lazy(() => JsonFilterObjectSchema).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  reportCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  isFlagged: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  viewCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const RecruiterFormScalarWhereInputObjectSchema: z.ZodType<Prisma.RecruiterFormScalarWhereInput> = recruiterformscalarwhereinputSchema as unknown as z.ZodType<Prisma.RecruiterFormScalarWhereInput>;
export const RecruiterFormScalarWhereInputObjectZodSchema = recruiterformscalarwhereinputSchema;
