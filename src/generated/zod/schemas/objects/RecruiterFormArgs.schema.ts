import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormSelectObjectSchema as RecruiterFormSelectObjectSchema } from './RecruiterFormSelect.schema';
import { RecruiterFormIncludeObjectSchema as RecruiterFormIncludeObjectSchema } from './RecruiterFormInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RecruiterFormSelectObjectSchema).optional(),
  include: z.lazy(() => RecruiterFormIncludeObjectSchema).optional()
}).strict();
export const RecruiterFormArgsObjectSchema = makeSchema();
export const RecruiterFormArgsObjectZodSchema = makeSchema();
