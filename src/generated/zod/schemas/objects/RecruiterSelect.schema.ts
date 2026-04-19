import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecruiterFormFindManySchema as RecruiterFormFindManySchema } from '../findManyRecruiterForm.schema';
import { EmailVerificationFindManySchema as EmailVerificationFindManySchema } from '../findManyEmailVerification.schema';
import { RecruiterCountOutputTypeArgsObjectSchema as RecruiterCountOutputTypeArgsObjectSchema } from './RecruiterCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  companyName: z.boolean().optional(),
  companyEmail: z.boolean().optional(),
  website: z.boolean().optional(),
  linkedinLink: z.boolean().optional(),
  verified: z.boolean().optional(),
  plan: z.boolean().optional(),
  formLimit: z.boolean().optional(),
  activeFormCount: z.boolean().optional(),
  totalFormsCount: z.boolean().optional(),
  totalFormsLimit: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  recruiterForms: z.union([z.boolean(), z.lazy(() => RecruiterFormFindManySchema)]).optional(),
  verification: z.union([z.boolean(), z.lazy(() => EmailVerificationFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RecruiterCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RecruiterSelectObjectSchema: z.ZodType<Prisma.RecruiterSelect> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterSelect>;
export const RecruiterSelectObjectZodSchema = makeSchema();
