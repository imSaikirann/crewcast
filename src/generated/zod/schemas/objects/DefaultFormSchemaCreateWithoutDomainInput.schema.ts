import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  version: z.number().int().optional(),
  fields: jsonSchema,
  isActive: z.boolean().optional(),
  isForSoftwareRoles: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DefaultFormSchemaCreateWithoutDomainInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaCreateWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaCreateWithoutDomainInput>;
export const DefaultFormSchemaCreateWithoutDomainInputObjectZodSchema = makeSchema();
