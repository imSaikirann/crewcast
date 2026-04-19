import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreWhereInputObjectSchema as ApplicationScoreWhereInputObjectSchema } from './ApplicationScoreWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationScoreWhereInputObjectSchema).optional()
}).strict();
export const ApplicationCountOutputTypeCountScoresArgsObjectSchema = makeSchema();
export const ApplicationCountOutputTypeCountScoresArgsObjectZodSchema = makeSchema();
