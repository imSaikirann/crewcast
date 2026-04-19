import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecruiterFormUpdateManyWithoutDomainNestedInputObjectSchema as RecruiterFormUpdateManyWithoutDomainNestedInputObjectSchema } from './RecruiterFormUpdateManyWithoutDomainNestedInput.schema'

const makeSchema = () => z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  jobCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  haveDefaultForm: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  recruiterForms: z.lazy(() => RecruiterFormUpdateManyWithoutDomainNestedInputObjectSchema).optional()
}).strict();
export const DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsUpdateWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUpdateWithoutDefaultFormSchemasInput>;
export const DomainsUpdateWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
