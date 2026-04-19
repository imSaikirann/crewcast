import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCountOutputTypeCountRecruiterFormsArgsObjectSchema as RecruiterCountOutputTypeCountRecruiterFormsArgsObjectSchema } from './RecruiterCountOutputTypeCountRecruiterFormsArgs.schema';
import { RecruiterCountOutputTypeCountVerificationArgsObjectSchema as RecruiterCountOutputTypeCountVerificationArgsObjectSchema } from './RecruiterCountOutputTypeCountVerificationArgs.schema'

const makeSchema = () => z.object({
  recruiterForms: z.union([z.boolean(), z.lazy(() => RecruiterCountOutputTypeCountRecruiterFormsArgsObjectSchema)]).optional(),
  verification: z.union([z.boolean(), z.lazy(() => RecruiterCountOutputTypeCountVerificationArgsObjectSchema)]).optional()
}).strict();
export const RecruiterCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RecruiterCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCountOutputTypeSelect>;
export const RecruiterCountOutputTypeSelectObjectZodSchema = makeSchema();
