import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsCountOutputTypeCountRecruiterFormsArgsObjectSchema as DomainsCountOutputTypeCountRecruiterFormsArgsObjectSchema } from './DomainsCountOutputTypeCountRecruiterFormsArgs.schema';
import { DomainsCountOutputTypeCountDefaultFormSchemasArgsObjectSchema as DomainsCountOutputTypeCountDefaultFormSchemasArgsObjectSchema } from './DomainsCountOutputTypeCountDefaultFormSchemasArgs.schema'

const makeSchema = () => z.object({
  recruiterForms: z.union([z.boolean(), z.lazy(() => DomainsCountOutputTypeCountRecruiterFormsArgsObjectSchema)]).optional(),
  defaultFormSchemas: z.union([z.boolean(), z.lazy(() => DomainsCountOutputTypeCountDefaultFormSchemasArgsObjectSchema)]).optional()
}).strict();
export const DomainsCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.DomainsCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCountOutputTypeSelect>;
export const DomainsCountOutputTypeSelectObjectZodSchema = makeSchema();
