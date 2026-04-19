import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCountOutputTypeSelectObjectSchema as RecruiterCountOutputTypeSelectObjectSchema } from './RecruiterCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RecruiterCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const RecruiterCountOutputTypeArgsObjectSchema = makeSchema();
export const RecruiterCountOutputTypeArgsObjectZodSchema = makeSchema();
