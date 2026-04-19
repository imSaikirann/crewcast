import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaWhereInputObjectSchema as DefaultFormSchemaWhereInputObjectSchema } from './DefaultFormSchemaWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DefaultFormSchemaWhereInputObjectSchema).optional()
}).strict();
export const DomainsCountOutputTypeCountDefaultFormSchemasArgsObjectSchema = makeSchema();
export const DomainsCountOutputTypeCountDefaultFormSchemasArgsObjectZodSchema = makeSchema();
