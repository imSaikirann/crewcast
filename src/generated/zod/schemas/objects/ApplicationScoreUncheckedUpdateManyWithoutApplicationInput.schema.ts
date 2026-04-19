import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FloatFieldUpdateOperationsInputObjectSchema as FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  totalScore: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)]).optional(),
  breakdown: z.union([jsonSchema, jsonSchema]).optional(),
  evaluatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ApplicationScoreUncheckedUpdateManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreUncheckedUpdateManyWithoutApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreUncheckedUpdateManyWithoutApplicationInput>;
export const ApplicationScoreUncheckedUpdateManyWithoutApplicationInputObjectZodSchema = makeSchema();
