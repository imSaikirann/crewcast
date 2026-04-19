import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterPlanSchema } from '../enums/RecruiterPlan.schema';
import { UserCreateNestedOneWithoutRecruiterInputObjectSchema as UserCreateNestedOneWithoutRecruiterInputObjectSchema } from './UserCreateNestedOneWithoutRecruiterInput.schema';
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
  user: z.lazy(() => UserCreateNestedOneWithoutRecruiterInputObjectSchema),
  verification: z.lazy(() => EmailVerificationCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const RecruiterCreateWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.RecruiterCreateWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateWithoutRecruiterFormsInput>;
export const RecruiterCreateWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
