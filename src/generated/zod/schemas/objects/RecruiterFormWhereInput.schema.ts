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
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { EnumJobStatusFilterObjectSchema as EnumJobStatusFilterObjectSchema } from './EnumJobStatusFilter.schema';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecruiterScalarRelationFilterObjectSchema as RecruiterScalarRelationFilterObjectSchema } from './RecruiterScalarRelationFilter.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema';
import { DomainsScalarRelationFilterObjectSchema as DomainsScalarRelationFilterObjectSchema } from './DomainsScalarRelationFilter.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './DomainsWhereInput.schema';
import { ApplicationListRelationFilterObjectSchema as ApplicationListRelationFilterObjectSchema } from './ApplicationListRelationFilter.schema';
import { FormViewListRelationFilterObjectSchema as FormViewListRelationFilterObjectSchema } from './FormViewListRelationFilter.schema';
import { JobReportListRelationFilterObjectSchema as JobReportListRelationFilterObjectSchema } from './JobReportListRelationFilter.schema'

const recruiterformwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RecruiterFormWhereInputObjectSchema), z.lazy(() => RecruiterFormWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecruiterFormWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecruiterFormWhereInputObjectSchema), z.lazy(() => RecruiterFormWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  recruiterId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  domainId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
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
  openings: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
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
  viewCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  recruiter: z.union([z.lazy(() => RecruiterScalarRelationFilterObjectSchema), z.lazy(() => RecruiterWhereInputObjectSchema)]).optional(),
  domain: z.union([z.lazy(() => DomainsScalarRelationFilterObjectSchema), z.lazy(() => DomainsWhereInputObjectSchema)]).optional(),
  applications: z.lazy(() => ApplicationListRelationFilterObjectSchema).optional(),
  views: z.lazy(() => FormViewListRelationFilterObjectSchema).optional(),
  jobReport: z.lazy(() => JobReportListRelationFilterObjectSchema).optional()
}).strict();
export const RecruiterFormWhereInputObjectSchema: z.ZodType<Prisma.RecruiterFormWhereInput> = recruiterformwhereinputSchema as unknown as z.ZodType<Prisma.RecruiterFormWhereInput>;
export const RecruiterFormWhereInputObjectZodSchema = recruiterformwhereinputSchema;
