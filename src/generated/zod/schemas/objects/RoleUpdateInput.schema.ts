import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { FormFieldUpdateManyWithoutRoleNestedInputObjectSchema as FormFieldUpdateManyWithoutRoleNestedInputObjectSchema } from './FormFieldUpdateManyWithoutRoleNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  fields: z.lazy(() => FormFieldUpdateManyWithoutRoleNestedInputObjectSchema).optional()
}).strict();
export const RoleUpdateInputObjectSchema: z.ZodType<Prisma.RoleUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleUpdateInput>;
export const RoleUpdateInputObjectZodSchema = makeSchema();
