import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { RecruiterFormCreateNestedOneWithoutApplicationsInputObjectSchema as RecruiterFormCreateNestedOneWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateNestedOneWithoutApplicationsInput.schema';
import { ApplicationScoreCreateNestedManyWithoutApplicationInputObjectSchema as ApplicationScoreCreateNestedManyWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateNestedManyWithoutApplicationInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  fullName: z.string(),
  email: z.string(),
  responses: jsonSchema,
  status: ApplicationStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  job: z.lazy(() => RecruiterFormCreateNestedOneWithoutApplicationsInputObjectSchema),
  scores: z.lazy(() => ApplicationScoreCreateNestedManyWithoutApplicationInputObjectSchema).optional()
}).strict();
export const ApplicationCreateInputObjectSchema: z.ZodType<Prisma.ApplicationCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateInput>;
export const ApplicationCreateInputObjectZodSchema = makeSchema();
