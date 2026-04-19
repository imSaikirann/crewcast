import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { EnumApplicationStatusFieldUpdateOperationsInputObjectSchema as EnumApplicationStatusFieldUpdateOperationsInputObjectSchema } from './EnumApplicationStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema as ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema } from './ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  jobId: z.union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  responses: z.union([jsonSchema, jsonSchema]).optional(),
  status: z.union([ApplicationStatusSchema, z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  scores: z.lazy(() => ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema).optional()
}).strict();
export const ApplicationUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateInput>;
export const ApplicationUncheckedUpdateInputObjectZodSchema = makeSchema();
