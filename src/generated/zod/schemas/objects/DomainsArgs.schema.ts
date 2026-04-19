import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsSelectObjectSchema as DomainsSelectObjectSchema } from './DomainsSelect.schema';
import { DomainsIncludeObjectSchema as DomainsIncludeObjectSchema } from './DomainsInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DomainsSelectObjectSchema).optional(),
  include: z.lazy(() => DomainsIncludeObjectSchema).optional()
}).strict();
export const DomainsArgsObjectSchema = makeSchema();
export const DomainsArgsObjectZodSchema = makeSchema();
