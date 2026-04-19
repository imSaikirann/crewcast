import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsCountOutputTypeSelectObjectSchema as DomainsCountOutputTypeSelectObjectSchema } from './DomainsCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DomainsCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const DomainsCountOutputTypeArgsObjectSchema = makeSchema();
export const DomainsCountOutputTypeArgsObjectZodSchema = makeSchema();
