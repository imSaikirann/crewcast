import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  domainId: z.string().max(24),
  version: z.number().int().optional(),
  fields: jsonSchema,
  isActive: z.boolean().optional(),
  isForSoftwareRoles: z.boolean(),
  createdAt: z.coerce.date().optional()
}).strict();
export const DefaultFormSchemaUncheckedCreateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUncheckedCreateInput>;
export const DefaultFormSchemaUncheckedCreateInputObjectZodSchema = makeSchema();
