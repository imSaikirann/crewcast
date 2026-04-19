import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  userId: z.string().max(24),
  companyName: z.string(),
  companyEmail: z.string(),
  website: z.string(),
  linkedinLink: z.string(),
  verified: z.boolean().optional(),
  plan: RecruiterPlanSchema.optional(),
  formLimit: z.number().int().optional(),
  activeFormCount: z.number().int().optional(),
  totalFormsCount: z.number().int().optional(),
  totalFormsLimit: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const RecruiterCreateManyInputObjectSchema: z.ZodType<Prisma.RecruiterCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateManyInput>;
export const RecruiterCreateManyInputObjectZodSchema = makeSchema();
