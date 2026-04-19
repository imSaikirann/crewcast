import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './DomainsWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => DomainsWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => DomainsWhereInputObjectSchema).optional()
}).strict();
export const DomainsScalarRelationFilterObjectSchema: z.ZodType<Prisma.DomainsScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.DomainsScalarRelationFilter>;
export const DomainsScalarRelationFilterObjectZodSchema = makeSchema();
