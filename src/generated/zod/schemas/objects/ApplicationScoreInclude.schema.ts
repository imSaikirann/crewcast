import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationArgsObjectSchema as ApplicationArgsObjectSchema } from './ApplicationArgs.schema'

const makeSchema = () => z.object({
  application: z.union([z.boolean(), z.lazy(() => ApplicationArgsObjectSchema)]).optional()
}).strict();
export const ApplicationScoreIncludeObjectSchema: z.ZodType<Prisma.ApplicationScoreInclude> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreInclude>;
export const ApplicationScoreIncludeObjectZodSchema = makeSchema();
