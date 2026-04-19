import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormFindManySchema as RecruiterFormFindManySchema } from '../findManyRecruiterForm.schema';
import { DefaultFormSchemaFindManySchema as DefaultFormSchemaFindManySchema } from '../findManyDefaultFormSchema.schema';
import { DomainsCountOutputTypeArgsObjectSchema as DomainsCountOutputTypeArgsObjectSchema } from './DomainsCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  recruiterForms: z.union([z.boolean(), z.lazy(() => RecruiterFormFindManySchema)]).optional(),
  defaultFormSchemas: z.union([z.boolean(), z.lazy(() => DefaultFormSchemaFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => DomainsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const DomainsIncludeObjectSchema: z.ZodType<Prisma.DomainsInclude> = makeSchema() as unknown as z.ZodType<Prisma.DomainsInclude>;
export const DomainsIncludeObjectZodSchema = makeSchema();
