import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { RecruiterFormCreateNestedManyWithoutRecruiterInputObjectSchema as RecruiterFormCreateNestedManyWithoutRecruiterInputObjectSchema } from './RecruiterFormCreateNestedManyWithoutRecruiterInput.schema';
import { EmailVerificationCreateNestedManyWithoutUserInputObjectSchema as EmailVerificationCreateNestedManyWithoutUserInputObjectSchema } from './EmailVerificationCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
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
  updatedAt: z.coerce.date().optional(),
  recruiterForms: z.lazy(() => RecruiterFormCreateNestedManyWithoutRecruiterInputObjectSchema).optional(),
  verification: z.lazy(() => EmailVerificationCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const RecruiterCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RecruiterCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateWithoutUserInput>;
export const RecruiterCreateWithoutUserInputObjectZodSchema = makeSchema();
