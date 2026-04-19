import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './ApplicationWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ApplicationWhereInputObjectSchema).optional()
}).strict();
export const ApplicationScalarRelationFilterObjectSchema: z.ZodType<Prisma.ApplicationScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScalarRelationFilter>;
export const ApplicationScalarRelationFilterObjectZodSchema = makeSchema();
