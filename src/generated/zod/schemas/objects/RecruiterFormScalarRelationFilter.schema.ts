import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormScalarRelationFilterObjectSchema: z.ZodType<Prisma.RecruiterFormScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormScalarRelationFilter>;
export const RecruiterFormScalarRelationFilterObjectZodSchema = makeSchema();
