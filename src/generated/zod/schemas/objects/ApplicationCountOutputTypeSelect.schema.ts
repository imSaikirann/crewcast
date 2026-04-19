import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCountOutputTypeCountScoresArgsObjectSchema as ApplicationCountOutputTypeCountScoresArgsObjectSchema } from './ApplicationCountOutputTypeCountScoresArgs.schema'

const makeSchema = () => z.object({
  scores: z.union([z.boolean(), z.lazy(() => ApplicationCountOutputTypeCountScoresArgsObjectSchema)]).optional()
}).strict();
export const ApplicationCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ApplicationCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCountOutputTypeSelect>;
export const ApplicationCountOutputTypeSelectObjectZodSchema = makeSchema();
