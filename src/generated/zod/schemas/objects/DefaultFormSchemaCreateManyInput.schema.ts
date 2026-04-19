import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  domainId: z.string().max(24),
  version: z.number().int().optional(),
  fields: jsonSchema,
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DefaultFormSchemaCreateManyInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaCreateManyInput>;
export const DefaultFormSchemaCreateManyInputObjectZodSchema = makeSchema();
