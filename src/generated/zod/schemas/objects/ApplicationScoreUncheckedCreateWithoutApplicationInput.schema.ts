import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  totalScore: z.number(),
  breakdown: jsonSchema,
  evaluatedAt: z.coerce.date().optional()
}).strict();
export const ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreUncheckedCreateWithoutApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreUncheckedCreateWithoutApplicationInput>;
export const ApplicationScoreUncheckedCreateWithoutApplicationInputObjectZodSchema = makeSchema();
