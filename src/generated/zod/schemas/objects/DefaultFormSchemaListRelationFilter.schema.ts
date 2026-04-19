import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaWhereInputObjectSchema as DefaultFormSchemaWhereInputObjectSchema } from './DefaultFormSchemaWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => DefaultFormSchemaWhereInputObjectSchema).optional(),
  some: z.lazy(() => DefaultFormSchemaWhereInputObjectSchema).optional(),
  none: z.lazy(() => DefaultFormSchemaWhereInputObjectSchema).optional()
}).strict();
export const DefaultFormSchemaListRelationFilterObjectSchema: z.ZodType<Prisma.DefaultFormSchemaListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaListRelationFilter>;
export const DefaultFormSchemaListRelationFilterObjectZodSchema = makeSchema();
