import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { EnumApplicationStatusFieldUpdateOperationsInputObjectSchema as EnumApplicationStatusFieldUpdateOperationsInputObjectSchema } from './EnumApplicationStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInputObjectSchema as RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInputObjectSchema } from './RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInput.schema';
import { ApplicationScoreUpdateManyWithoutApplicationNestedInputObjectSchema as ApplicationScoreUpdateManyWithoutApplicationNestedInputObjectSchema } from './ApplicationScoreUpdateManyWithoutApplicationNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  trackingToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  responses: z.union([jsonSchema, jsonSchema]).optional(),
  status: z.union([ApplicationStatusSchema, z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  job: z.lazy(() => RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInputObjectSchema).optional(),
  scores: z.lazy(() => ApplicationScoreUpdateManyWithoutApplicationNestedInputObjectSchema).optional()
}).strict();
export const ApplicationUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUpdateInput>;
export const ApplicationUpdateInputObjectZodSchema = makeSchema();
