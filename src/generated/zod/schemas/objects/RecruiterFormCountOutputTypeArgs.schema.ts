import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCountOutputTypeSelectObjectSchema as RecruiterFormCountOutputTypeSelectObjectSchema } from './RecruiterFormCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RecruiterFormCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const RecruiterFormCountOutputTypeArgsObjectSchema = makeSchema();
export const RecruiterFormCountOutputTypeArgsObjectZodSchema = makeSchema();
