import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreWhereInputObjectSchema as ApplicationScoreWhereInputObjectSchema } from './ApplicationScoreWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ApplicationScoreWhereInputObjectSchema).optional(),
  some: z.lazy(() => ApplicationScoreWhereInputObjectSchema).optional(),
  none: z.lazy(() => ApplicationScoreWhereInputObjectSchema).optional()
}).strict();
export const ApplicationScoreListRelationFilterObjectSchema: z.ZodType<Prisma.ApplicationScoreListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreListRelationFilter>;
export const ApplicationScoreListRelationFilterObjectZodSchema = makeSchema();
