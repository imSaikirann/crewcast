import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectSchema as RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedCreateNestedManyWithoutDomainInput.schema';
import { DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  title: z.string(),
  description: z.string(),
  jobCount: z.number().int().optional(),
  haveDefaultForm: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recruiterForms: z.lazy(() => RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectSchema).optional(),
  defaultFormSchemas: z.lazy(() => DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectSchema).optional()
}).strict();
export const DomainsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.DomainsUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUncheckedCreateInput>;
export const DomainsUncheckedCreateInputObjectZodSchema = makeSchema();
