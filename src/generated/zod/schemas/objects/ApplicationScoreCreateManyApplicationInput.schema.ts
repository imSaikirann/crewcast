import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  totalScore: z.number(),
  breakdown: jsonSchema,
  evaluatedAt: z.coerce.date().optional()
}).strict();
export const ApplicationScoreCreateManyApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreCreateManyApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreCreateManyApplicationInput>;
export const ApplicationScoreCreateManyApplicationInputObjectZodSchema = makeSchema();
