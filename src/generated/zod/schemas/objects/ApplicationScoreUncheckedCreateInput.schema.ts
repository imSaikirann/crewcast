import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  applicationId: z.string().max(24),
  totalScore: z.number(),
  breakdown: jsonSchema,
  evaluatedAt: z.coerce.date().optional()
}).strict();
export const ApplicationScoreUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ApplicationScoreUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreUncheckedCreateInput>;
export const ApplicationScoreUncheckedCreateInputObjectZodSchema = makeSchema();
