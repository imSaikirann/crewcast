import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './FormViewWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => FormViewWhereInputObjectSchema).optional(),
  some: z.lazy(() => FormViewWhereInputObjectSchema).optional(),
  none: z.lazy(() => FormViewWhereInputObjectSchema).optional()
}).strict();
export const FormViewListRelationFilterObjectSchema: z.ZodType<Prisma.FormViewListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FormViewListRelationFilter>;
export const FormViewListRelationFilterObjectZodSchema = makeSchema();
