import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaSelectObjectSchema as DefaultFormSchemaSelectObjectSchema } from './DefaultFormSchemaSelect.schema';
import { DefaultFormSchemaIncludeObjectSchema as DefaultFormSchemaIncludeObjectSchema } from './DefaultFormSchemaInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DefaultFormSchemaSelectObjectSchema).optional(),
  include: z.lazy(() => DefaultFormSchemaIncludeObjectSchema).optional()
}).strict();
export const DefaultFormSchemaArgsObjectSchema = makeSchema();
export const DefaultFormSchemaArgsObjectZodSchema = makeSchema();
