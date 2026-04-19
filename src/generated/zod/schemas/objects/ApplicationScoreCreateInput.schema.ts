import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCreateNestedOneWithoutScoresInputObjectSchema as ApplicationCreateNestedOneWithoutScoresInputObjectSchema } from './ApplicationCreateNestedOneWithoutScoresInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  totalScore: z.number(),
  breakdown: jsonSchema,
  evaluatedAt: z.coerce.date().optional(),
  application: z.lazy(() => ApplicationCreateNestedOneWithoutScoresInputObjectSchema)
}).strict();
export const ApplicationScoreCreateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreCreateInput>;
export const ApplicationScoreCreateInputObjectZodSchema = makeSchema();
