import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateNestedManyWithoutDomainInputObjectSchema as RecruiterFormCreateNestedManyWithoutDomainInputObjectSchema } from './RecruiterFormCreateNestedManyWithoutDomainInput.schema';
import { DefaultFormSchemaCreateNestedManyWithoutDomainInputObjectSchema as DefaultFormSchemaCreateNestedManyWithoutDomainInputObjectSchema } from './DefaultFormSchemaCreateNestedManyWithoutDomainInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  title: z.string(),
  description: z.string(),
  jobCount: z.number().int().optional(),
  haveDefaultForm: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recruiterForms: z.lazy(() => RecruiterFormCreateNestedManyWithoutDomainInputObjectSchema).optional(),
  defaultFormSchemas: z.lazy(() => DefaultFormSchemaCreateNestedManyWithoutDomainInputObjectSchema).optional()
}).strict();
export const DomainsCreateInputObjectSchema: z.ZodType<Prisma.DomainsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCreateInput>;
export const DomainsCreateInputObjectZodSchema = makeSchema();
