import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { ApplicationScoreUncheckedCreateNestedManyWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedCreateNestedManyWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedCreateNestedManyWithoutApplicationInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  trackingToken: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  responses: jsonSchema,
  status: ApplicationStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scores: z.lazy(() => ApplicationScoreUncheckedCreateNestedManyWithoutApplicationInputObjectSchema).optional()
}).strict();
export const ApplicationUncheckedCreateWithoutJobInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedCreateWithoutJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUncheckedCreateWithoutJobInput>;
export const ApplicationUncheckedCreateWithoutJobInputObjectZodSchema = makeSchema();
