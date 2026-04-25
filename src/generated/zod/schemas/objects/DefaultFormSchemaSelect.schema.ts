import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsArgsObjectSchema as DomainsArgsObjectSchema } from './DomainsArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  domainId: z.boolean().optional(),
  domain: z.union([z.boolean(), z.lazy(() => DomainsArgsObjectSchema)]).optional(),
  version: z.boolean().optional(),
  fields: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isForSoftwareRoles: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const DefaultFormSchemaSelectObjectSchema: z.ZodType<Prisma.DefaultFormSchemaSelect> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaSelect>;
export const DefaultFormSchemaSelectObjectZodSchema = makeSchema();
