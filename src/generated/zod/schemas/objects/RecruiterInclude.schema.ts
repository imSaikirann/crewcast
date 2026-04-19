import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecruiterFormFindManySchema as RecruiterFormFindManySchema } from '../findManyRecruiterForm.schema';
import { EmailVerificationFindManySchema as EmailVerificationFindManySchema } from '../findManyEmailVerification.schema';
import { RecruiterCountOutputTypeArgsObjectSchema as RecruiterCountOutputTypeArgsObjectSchema } from './RecruiterCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  recruiterForms: z.union([z.boolean(), z.lazy(() => RecruiterFormFindManySchema)]).optional(),
  verification: z.union([z.boolean(), z.lazy(() => EmailVerificationFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RecruiterCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RecruiterIncludeObjectSchema: z.ZodType<Prisma.RecruiterInclude> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterInclude>;
export const RecruiterIncludeObjectZodSchema = makeSchema();
