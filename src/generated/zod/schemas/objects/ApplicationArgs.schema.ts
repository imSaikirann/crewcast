import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationSelectObjectSchema as ApplicationSelectObjectSchema } from './ApplicationSelect.schema';
import { ApplicationIncludeObjectSchema as ApplicationIncludeObjectSchema } from './ApplicationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ApplicationSelectObjectSchema).optional(),
  include: z.lazy(() => ApplicationIncludeObjectSchema).optional()
}).strict();
export const ApplicationArgsObjectSchema = makeSchema();
export const ApplicationArgsObjectZodSchema = makeSchema();
