import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { ApplicationScoreCreateNestedManyWithoutApplicationInputObjectSchema as ApplicationScoreCreateNestedManyWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateNestedManyWithoutApplicationInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  fullName: z.string(),
  email: z.string(),
  responses: jsonSchema,
  status: ApplicationStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scores: z.lazy(() => ApplicationScoreCreateNestedManyWithoutApplicationInputObjectSchema).optional()
}).strict();
export const ApplicationCreateWithoutJobInputObjectSchema: z.ZodType<Prisma.ApplicationCreateWithoutJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateWithoutJobInput>;
export const ApplicationCreateWithoutJobInputObjectZodSchema = makeSchema();
