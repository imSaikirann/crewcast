import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  companyName: SortOrderSchema.optional(),
  companyEmail: SortOrderSchema.optional(),
  website: SortOrderSchema.optional(),
  linkedinLink: SortOrderSchema.optional(),
  verified: SortOrderSchema.optional(),
  plan: SortOrderSchema.optional(),
  formLimit: SortOrderSchema.optional(),
  activeFormCount: SortOrderSchema.optional(),
  totalFormsCount: SortOrderSchema.optional(),
  totalFormsLimit: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const RecruiterMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterMaxOrderByAggregateInput>;
export const RecruiterMaxOrderByAggregateInputObjectZodSchema = makeSchema();
