import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  trackingToken: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  responses: jsonSchema,
  status: ApplicationStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ApplicationCreateManyJobInputObjectSchema: z.ZodType<Prisma.ApplicationCreateManyJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateManyJobInput>;
export const ApplicationCreateManyJobInputObjectZodSchema = makeSchema();
