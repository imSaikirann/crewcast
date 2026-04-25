import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  trackingToken: z.string().optional(),
  jobId: z.string().max(24),
  fullName: z.string(),
  email: z.string(),
  responses: jsonSchema,
  status: ApplicationStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ApplicationCreateManyInputObjectSchema: z.ZodType<Prisma.ApplicationCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateManyInput>;
export const ApplicationCreateManyInputObjectZodSchema = makeSchema();
