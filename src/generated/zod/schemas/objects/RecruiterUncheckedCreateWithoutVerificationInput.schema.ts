import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  recruiterForms: z.lazy(() => RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema).optional()
}).strict();
export const RecruiterUncheckedCreateWithoutVerificationInputObjectSchema: z.ZodType<Prisma.RecruiterUncheckedCreateWithoutVerificationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUncheckedCreateWithoutVerificationInput>;
export const RecruiterUncheckedCreateWithoutVerificationInputObjectZodSchema = makeSchema();
