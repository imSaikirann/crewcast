import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecruiterOrderByWithRelationInputObjectSchema as RecruiterOrderByWithRelationInputObjectSchema } from './RecruiterOrderByWithRelationInput.schema';
import { DomainsOrderByWithRelationInputObjectSchema as DomainsOrderByWithRelationInputObjectSchema } from './DomainsOrderByWithRelationInput.schema';
import { ApplicationOrderByRelationAggregateInputObjectSchema as ApplicationOrderByRelationAggregateInputObjectSchema } from './ApplicationOrderByRelationAggregateInput.schema';
import { FormViewOrderByRelationAggregateInputObjectSchema as FormViewOrderByRelationAggregateInputObjectSchema } from './FormViewOrderByRelationAggregateInput.schema';
import { JobReportOrderByRelationAggregateInputObjectSchema as JobReportOrderByRelationAggregateInputObjectSchema } from './JobReportOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  recruiterId: SortOrderSchema.optional(),
  domainId: SortOrderSchema.optional(),
  publicId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  specialization: SortOrderSchema.optional(),
  roleType: SortOrderSchema.optional(),
  experience: SortOrderSchema.optional(),
  workMode: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  salaryMin: SortOrderSchema.optional(),
  salaryMax: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  techStack: SortOrderSchema.optional(),
  openings: SortOrderSchema.optional(),
  contractDurationMonths: SortOrderSchema.optional(),
  showCompanyName: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  publishedAt: SortOrderSchema.optional(),
  fields: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  reportCount: SortOrderSchema.optional(),
  isFlagged: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional(),
  recruiter: z.lazy(() => RecruiterOrderByWithRelationInputObjectSchema).optional(),
  domain: z.lazy(() => DomainsOrderByWithRelationInputObjectSchema).optional(),
  applications: z.lazy(() => ApplicationOrderByRelationAggregateInputObjectSchema).optional(),
  views: z.lazy(() => FormViewOrderByRelationAggregateInputObjectSchema).optional(),
  jobReport: z.lazy(() => JobReportOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const RecruiterFormOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecruiterFormOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormOrderByWithRelationInput>;
export const RecruiterFormOrderByWithRelationInputObjectZodSchema = makeSchema();
