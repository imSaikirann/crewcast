import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterSelectObjectSchema as RecruiterSelectObjectSchema } from './RecruiterSelect.schema';
import { RecruiterIncludeObjectSchema as RecruiterIncludeObjectSchema } from './RecruiterInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RecruiterSelectObjectSchema).optional(),
  include: z.lazy(() => RecruiterIncludeObjectSchema).optional()
}).strict();
export const RecruiterArgsObjectSchema = makeSchema();
export const RecruiterArgsObjectZodSchema = makeSchema();
