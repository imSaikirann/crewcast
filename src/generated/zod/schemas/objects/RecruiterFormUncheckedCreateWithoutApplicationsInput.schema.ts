import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleTypeSchema } from '../enums/RoleType.schema';
import { ExperienceSchema } from '../enums/Experience.schema';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { RecruiterFormCreatetechStackInputObjectSchema as RecruiterFormCreatetechStackInputObjectSchema } from './RecruiterFormCreatetechStackInput.schema';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { FormViewUncheckedCreateNestedManyWithoutFormInputObjectSchema as FormViewUncheckedCreateNestedManyWithoutFormInputObjectSchema } from './FormViewUncheckedCreateNestedManyWithoutFormInput.schema';
import { JobReportUncheckedCreateNestedManyWithoutFormInputObjectSchema as JobReportUncheckedCreateNestedManyWithoutFormInputObjectSchema } from './JobReportUncheckedCreateNestedManyWithoutFormInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  recruiterId: z.string(),
  domainId: z.string(),
  publicId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  specialization: z.string(),
  roleType: RoleTypeSchema,
  experience: ExperienceSchema,
  workMode: WorkModeSchema,
  location: z.string().optional().nullable(),
  salaryMin: z.number().int().optional().nullable(),
  salaryMax: z.number().int().optional().nullable(),
  currency: z.string().optional().nullable(),
  techStack: z.union([z.lazy(() => RecruiterFormCreatetechStackInputObjectSchema), z.string().array()]).optional(),
  openings: z.number().int().optional(),
  contractDurationMonths: z.number().int().optional().nullable(),
  showCompanyName: z.boolean().optional(),
  status: JobStatusSchema.optional(),
  version: z.number().int().optional(),
  publishedAt: z.coerce.date().optional().nullable(),
  fields: jsonSchema,
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportCount: z.number().int().optional(),
  isFlagged: z.boolean().optional(),
  viewCount: z.number().int().optional(),
  views: z.lazy(() => FormViewUncheckedCreateNestedManyWithoutFormInputObjectSchema).optional(),
  jobReport: z.lazy(() => JobReportUncheckedCreateNestedManyWithoutFormInputObjectSchema).optional()
}).strict();
export const RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.RecruiterFormUncheckedCreateWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUncheckedCreateWithoutApplicationsInput>;
export const RecruiterFormUncheckedCreateWithoutApplicationsInputObjectZodSchema = makeSchema();
