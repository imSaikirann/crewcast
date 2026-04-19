import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInput.schema';
import { EmailVerificationUncheckedCreateNestedManyWithoutUserInputObjectSchema as EmailVerificationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './EmailVerificationUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
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
  recruiterForms: z.lazy(() => RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema).optional(),
  verification: z.lazy(() => EmailVerificationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const RecruiterUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RecruiterUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUncheckedCreateWithoutUserInput>;
export const RecruiterUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
