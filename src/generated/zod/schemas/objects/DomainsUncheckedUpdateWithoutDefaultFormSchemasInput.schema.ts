import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecruiterFormUncheckedUpdateManyWithoutDomainNestedInputObjectSchema as RecruiterFormUncheckedUpdateManyWithoutDomainNestedInputObjectSchema } from './RecruiterFormUncheckedUpdateManyWithoutDomainNestedInput.schema'

const makeSchema = () => z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  jobCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  haveDefaultForm: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  recruiterForms: z.lazy(() => RecruiterFormUncheckedUpdateManyWithoutDomainNestedInputObjectSchema).optional()
}).strict();
export const DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsUncheckedUpdateWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUncheckedUpdateWithoutDefaultFormSchemasInput>;
export const DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
