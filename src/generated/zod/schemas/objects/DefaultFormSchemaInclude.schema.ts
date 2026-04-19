import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsArgsObjectSchema as DomainsArgsObjectSchema } from './DomainsArgs.schema'

const makeSchema = () => z.object({
  domain: z.union([z.boolean(), z.lazy(() => DomainsArgsObjectSchema)]).optional()
}).strict();
export const DefaultFormSchemaIncludeObjectSchema: z.ZodType<Prisma.DefaultFormSchemaInclude> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaInclude>;
export const DefaultFormSchemaIncludeObjectZodSchema = makeSchema();
