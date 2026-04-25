import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecruiterFormCountOrderByAggregateInputObjectSchema as RecruiterFormCountOrderByAggregateInputObjectSchema } from './RecruiterFormCountOrderByAggregateInput.schema';
import { RecruiterFormAvgOrderByAggregateInputObjectSchema as RecruiterFormAvgOrderByAggregateInputObjectSchema } from './RecruiterFormAvgOrderByAggregateInput.schema';
import { RecruiterFormMaxOrderByAggregateInputObjectSchema as RecruiterFormMaxOrderByAggregateInputObjectSchema } from './RecruiterFormMaxOrderByAggregateInput.schema';
import { RecruiterFormMinOrderByAggregateInputObjectSchema as RecruiterFormMinOrderByAggregateInputObjectSchema } from './RecruiterFormMinOrderByAggregateInput.schema';
import { RecruiterFormSumOrderByAggregateInputObjectSchema as RecruiterFormSumOrderByAggregateInputObjectSchema } from './RecruiterFormSumOrderByAggregateInput.schema'

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
  _count: z.lazy(() => RecruiterFormCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RecruiterFormAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RecruiterFormMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RecruiterFormMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RecruiterFormSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RecruiterFormOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecruiterFormOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormOrderByWithAggregationInput>;
export const RecruiterFormOrderByWithAggregationInputObjectZodSchema = makeSchema();
