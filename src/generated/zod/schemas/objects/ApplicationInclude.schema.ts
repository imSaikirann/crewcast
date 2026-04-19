import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormArgsObjectSchema as RecruiterFormArgsObjectSchema } from './RecruiterFormArgs.schema';
import { ApplicationScoreFindManySchema as ApplicationScoreFindManySchema } from '../findManyApplicationScore.schema';
import { ApplicationCountOutputTypeArgsObjectSchema as ApplicationCountOutputTypeArgsObjectSchema } from './ApplicationCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  job: z.union([z.boolean(), z.lazy(() => RecruiterFormArgsObjectSchema)]).optional(),
  scores: z.union([z.boolean(), z.lazy(() => ApplicationScoreFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ApplicationCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ApplicationIncludeObjectSchema: z.ZodType<Prisma.ApplicationInclude> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationInclude>;
export const ApplicationIncludeObjectZodSchema = makeSchema();
