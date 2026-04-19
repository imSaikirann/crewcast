import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => RecruiterWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => RecruiterWhereInputObjectSchema).optional()
}).strict();
export const RecruiterScalarRelationFilterObjectSchema: z.ZodType<Prisma.RecruiterScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterScalarRelationFilter>;
export const RecruiterScalarRelationFilterObjectZodSchema = makeSchema();
