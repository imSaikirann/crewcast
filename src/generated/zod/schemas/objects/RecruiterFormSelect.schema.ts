import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterArgsObjectSchema as RecruiterArgsObjectSchema } from './RecruiterArgs.schema';
import { DomainsArgsObjectSchema as DomainsArgsObjectSchema } from './DomainsArgs.schema';
import { ApplicationFindManySchema as ApplicationFindManySchema } from '../findManyApplication.schema';
import { FormViewFindManySchema as FormViewFindManySchema } from '../findManyFormView.schema';
import { JobReportFindManySchema as JobReportFindManySchema } from '../findManyJobReport.schema';
import { RecruiterFormCountOutputTypeArgsObjectSchema as RecruiterFormCountOutputTypeArgsObjectSchema } from './RecruiterFormCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  recruiterId: z.boolean().optional(),
  recruiter: z.union([z.boolean(), z.lazy(() => RecruiterArgsObjectSchema)]).optional(),
  domainId: z.boolean().optional(),
  domain: z.union([z.boolean(), z.lazy(() => DomainsArgsObjectSchema)]).optional(),
  publicId: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  specialization: z.boolean().optional(),
  roleType: z.boolean().optional(),
  experience: z.boolean().optional(),
  workMode: z.boolean().optional(),
  location: z.boolean().optional(),
  salaryMin: z.boolean().optional(),
  salaryMax: z.boolean().optional(),
  currency: z.boolean().optional(),
  techStack: z.boolean().optional(),
  openings: z.boolean().optional(),
  contractDurationMonths: z.boolean().optional(),
  showCompanyName: z.boolean().optional(),
  status: z.boolean().optional(),
  version: z.boolean().optional(),
  publishedAt: z.boolean().optional(),
  fields: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  applications: z.union([z.boolean(), z.lazy(() => ApplicationFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  reportCount: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  viewCount: z.boolean().optional(),
  views: z.union([z.boolean(), z.lazy(() => FormViewFindManySchema)]).optional(),
  jobReport: z.union([z.boolean(), z.lazy(() => JobReportFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RecruiterFormCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RecruiterFormSelectObjectSchema: z.ZodType<Prisma.RecruiterFormSelect> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormSelect>;
export const RecruiterFormSelectObjectZodSchema = makeSchema();
