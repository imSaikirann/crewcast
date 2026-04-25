import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  version: z.number().int().optional(),
  fields: jsonSchema,
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUncheckedCreateWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUncheckedCreateWithoutDomainInput>;
export const DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectZodSchema = makeSchema();
