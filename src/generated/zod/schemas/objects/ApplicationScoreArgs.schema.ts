import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreSelectObjectSchema as ApplicationScoreSelectObjectSchema } from './ApplicationScoreSelect.schema';
import { ApplicationScoreIncludeObjectSchema as ApplicationScoreIncludeObjectSchema } from './ApplicationScoreInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ApplicationScoreSelectObjectSchema).optional(),
  include: z.lazy(() => ApplicationScoreIncludeObjectSchema).optional()
}).strict();
export const ApplicationScoreArgsObjectSchema = makeSchema();
export const ApplicationScoreArgsObjectZodSchema = makeSchema();
