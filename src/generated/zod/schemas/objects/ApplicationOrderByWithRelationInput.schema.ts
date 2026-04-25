import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecruiterFormOrderByWithRelationInputObjectSchema as RecruiterFormOrderByWithRelationInputObjectSchema } from './RecruiterFormOrderByWithRelationInput.schema';
import { ApplicationScoreOrderByRelationAggregateInputObjectSchema as ApplicationScoreOrderByRelationAggregateInputObjectSchema } from './ApplicationScoreOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  trackingToken: SortOrderSchema.optional(),
  jobId: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  responses: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  job: z.lazy(() => RecruiterFormOrderByWithRelationInputObjectSchema).optional(),
  scores: z.lazy(() => ApplicationScoreOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ApplicationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ApplicationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationOrderByWithRelationInput>;
export const ApplicationOrderByWithRelationInputObjectZodSchema = makeSchema();
