import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { RecruiterFormCreateNestedOneWithoutApplicationsInputObjectSchema as RecruiterFormCreateNestedOneWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateNestedOneWithoutApplicationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  trackingToken: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  responses: jsonSchema,
  status: ApplicationStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  job: z.lazy(() => RecruiterFormCreateNestedOneWithoutApplicationsInputObjectSchema)
}).strict();
export const ApplicationCreateWithoutScoresInputObjectSchema: z.ZodType<Prisma.ApplicationCreateWithoutScoresInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateWithoutScoresInput>;
export const ApplicationCreateWithoutScoresInputObjectZodSchema = makeSchema();
