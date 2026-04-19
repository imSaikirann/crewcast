import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCountOutputTypeSelectObjectSchema as ApplicationCountOutputTypeSelectObjectSchema } from './ApplicationCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ApplicationCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ApplicationCountOutputTypeArgsObjectSchema = makeSchema();
export const ApplicationCountOutputTypeArgsObjectZodSchema = makeSchema();
