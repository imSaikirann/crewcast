import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleTypeSchema } from '../enums/RoleType.schema';
import { ExperienceSchema } from '../enums/Experience.schema';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { RecruiterFormCreatetechStackInputObjectSchema as RecruiterFormCreatetechStackInputObjectSchema } from './RecruiterFormCreatetechStackInput.schema';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { DomainsCreateNestedOneWithoutRecruiterFormsInputObjectSchema as DomainsCreateNestedOneWithoutRecruiterFormsInputObjectSchema } from './DomainsCreateNestedOneWithoutRecruiterFormsInput.schema';
import { ApplicationCreateNestedManyWithoutJobInputObjectSchema as ApplicationCreateNestedManyWithoutJobInputObjectSchema } from './ApplicationCreateNestedManyWithoutJobInput.schema';
import { FormViewCreateNestedManyWithoutFormInputObjectSchema as FormViewCreateNestedManyWithoutFormInputObjectSchema } from './FormViewCreateNestedManyWithoutFormInput.schema';
import { JobReportCreateNestedManyWithoutFormInputObjectSchema as JobReportCreateNestedManyWithoutFormInputObjectSchema } from './JobReportCreateNestedManyWithoutFormInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
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
  domain: z.lazy(() => DomainsCreateNestedOneWithoutRecruiterFormsInputObjectSchema),
  applications: z.lazy(() => ApplicationCreateNestedManyWithoutJobInputObjectSchema).optional(),
  views: z.lazy(() => FormViewCreateNestedManyWithoutFormInputObjectSchema).optional(),
  jobReport: z.lazy(() => JobReportCreateNestedManyWithoutFormInputObjectSchema).optional()
}).strict();
export const RecruiterFormCreateWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateWithoutRecruiterInput>;
export const RecruiterFormCreateWithoutRecruiterInputObjectZodSchema = makeSchema();
