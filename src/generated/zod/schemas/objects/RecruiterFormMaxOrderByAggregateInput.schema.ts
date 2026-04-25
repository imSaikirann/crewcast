import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

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
  openings: SortOrderSchema.optional(),
  contractDurationMonths: SortOrderSchema.optional(),
  showCompanyName: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  publishedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  reportCount: SortOrderSchema.optional(),
  isFlagged: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional()
}).strict();
export const RecruiterFormMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterFormMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormMaxOrderByAggregateInput>;
export const RecruiterFormMaxOrderByAggregateInputObjectZodSchema = makeSchema();
