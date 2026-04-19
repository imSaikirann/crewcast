import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => RecruiterWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => RecruiterWhereInputObjectSchema).optional().nullable()
}).strict();
export const RecruiterNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.RecruiterNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterNullableScalarRelationFilter>;
export const RecruiterNullableScalarRelationFilterObjectZodSchema = makeSchema();
