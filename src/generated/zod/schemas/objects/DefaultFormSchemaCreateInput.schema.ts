import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsCreateNestedOneWithoutDefaultFormSchemasInputObjectSchema as DomainsCreateNestedOneWithoutDefaultFormSchemasInputObjectSchema } from './DomainsCreateNestedOneWithoutDefaultFormSchemasInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  version: z.number().int().optional(),
  fields: jsonSchema,
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  domain: z.lazy(() => DomainsCreateNestedOneWithoutDefaultFormSchemasInputObjectSchema)
}).strict();
export const DefaultFormSchemaCreateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaCreateInput>;
export const DefaultFormSchemaCreateInputObjectZodSchema = makeSchema();
