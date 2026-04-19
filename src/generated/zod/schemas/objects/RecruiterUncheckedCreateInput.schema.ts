import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInput.schema';
import { EmailVerificationUncheckedCreateNestedManyWithoutUserInputObjectSchema as EmailVerificationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './EmailVerificationUncheckedCreateNestedManyWithoutUserInput.schema'

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
  recruiterForms: z.lazy(() => RecruiterFormUncheckedCreateNestedManyWithoutRecruiterInputObjectSchema).optional(),
  verification: z.lazy(() => EmailVerificationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const RecruiterUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RecruiterUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUncheckedCreateInput>;
export const RecruiterUncheckedCreateInputObjectZodSchema = makeSchema();
