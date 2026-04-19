import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  jobCount: z.number().int().optional(),
  haveDefaultForm: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  defaultFormSchemas: z.lazy(() => DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectSchema).optional()
}).strict();
export const DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.DomainsUncheckedCreateWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUncheckedCreateWithoutRecruiterFormsInput>;
export const DomainsUncheckedCreateWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
