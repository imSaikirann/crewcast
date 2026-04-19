import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { RecruiterFormOrderByRelationAggregateInputObjectSchema as RecruiterFormOrderByRelationAggregateInputObjectSchema } from './RecruiterFormOrderByRelationAggregateInput.schema';
import { EmailVerificationOrderByRelationAggregateInputObjectSchema as EmailVerificationOrderByRelationAggregateInputObjectSchema } from './EmailVerificationOrderByRelationAggregateInput.schema'

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
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  recruiterForms: z.lazy(() => RecruiterFormOrderByRelationAggregateInputObjectSchema).optional(),
  verification: z.lazy(() => EmailVerificationOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const RecruiterOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecruiterOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterOrderByWithRelationInput>;
export const RecruiterOrderByWithRelationInputObjectZodSchema = makeSchema();
