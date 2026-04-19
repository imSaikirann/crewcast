import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateNestedManyWithoutDomainInputObjectSchema as RecruiterFormCreateNestedManyWithoutDomainInputObjectSchema } from './RecruiterFormCreateNestedManyWithoutDomainInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  title: z.string(),
  description: z.string(),
  jobCount: z.number().int().optional(),
  haveDefaultForm: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  recruiterForms: z.lazy(() => RecruiterFormCreateNestedManyWithoutDomainInputObjectSchema).optional()
}).strict();
export const DomainsCreateWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsCreateWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCreateWithoutDefaultFormSchemasInput>;
export const DomainsCreateWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
