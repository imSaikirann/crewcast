import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  companyName: z.literal(true).optional(),
  companyEmail: z.literal(true).optional(),
  website: z.literal(true).optional(),
  linkedinLink: z.literal(true).optional(),
  verified: z.literal(true).optional(),
  plan: z.literal(true).optional(),
  formLimit: z.literal(true).optional(),
  activeFormCount: z.literal(true).optional(),
  totalFormsCount: z.literal(true).optional(),
  totalFormsLimit: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const RecruiterMaxAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterMaxAggregateInputType>;
export const RecruiterMaxAggregateInputObjectZodSchema = makeSchema();
