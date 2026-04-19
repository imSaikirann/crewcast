import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecruiterFormOrderByRelationAggregateInputObjectSchema as RecruiterFormOrderByRelationAggregateInputObjectSchema } from './RecruiterFormOrderByRelationAggregateInput.schema';
import { DefaultFormSchemaOrderByRelationAggregateInputObjectSchema as DefaultFormSchemaOrderByRelationAggregateInputObjectSchema } from './DefaultFormSchemaOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  jobCount: SortOrderSchema.optional(),
  haveDefaultForm: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  recruiterForms: z.lazy(() => RecruiterFormOrderByRelationAggregateInputObjectSchema).optional(),
  defaultFormSchemas: z.lazy(() => DefaultFormSchemaOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const DomainsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.DomainsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsOrderByWithRelationInput>;
export const DomainsOrderByWithRelationInputObjectZodSchema = makeSchema();
