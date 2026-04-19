import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormFindManySchema as RecruiterFormFindManySchema } from '../findManyRecruiterForm.schema';
import { DefaultFormSchemaFindManySchema as DefaultFormSchemaFindManySchema } from '../findManyDefaultFormSchema.schema';
import { DomainsCountOutputTypeArgsObjectSchema as DomainsCountOutputTypeArgsObjectSchema } from './DomainsCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  jobCount: z.boolean().optional(),
  haveDefaultForm: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  recruiterForms: z.union([z.boolean(), z.lazy(() => RecruiterFormFindManySchema)]).optional(),
  defaultFormSchemas: z.union([z.boolean(), z.lazy(() => DefaultFormSchemaFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => DomainsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const DomainsSelectObjectSchema: z.ZodType<Prisma.DomainsSelect> = makeSchema() as unknown as z.ZodType<Prisma.DomainsSelect>;
export const DomainsSelectObjectZodSchema = makeSchema();
