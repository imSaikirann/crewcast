import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInputObjectSchema as DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInputObjectSchema } from './DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  version: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  fields: z.union([jsonSchema, jsonSchema]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  isForSoftwareRoles: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  domain: z.lazy(() => DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInputObjectSchema).optional()
}).strict();
export const DefaultFormSchemaUpdateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpdateInput>;
export const DefaultFormSchemaUpdateInputObjectZodSchema = makeSchema();
