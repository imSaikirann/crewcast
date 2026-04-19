import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectSchema as RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedCreateNestedManyWithoutDomainInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  jobCount: z.number().int().optional(),
  haveDefaultForm: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  recruiterForms: z.lazy(() => RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectSchema).optional()
}).strict();
export const DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsUncheckedCreateWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUncheckedCreateWithoutDefaultFormSchemasInput>;
export const DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
