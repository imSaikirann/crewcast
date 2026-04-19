import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional(),
  some: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional(),
  none: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormListRelationFilterObjectSchema: z.ZodType<Prisma.RecruiterFormListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormListRelationFilter>;
export const RecruiterFormListRelationFilterObjectZodSchema = makeSchema();
