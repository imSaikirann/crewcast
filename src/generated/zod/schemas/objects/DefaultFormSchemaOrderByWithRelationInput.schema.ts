import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { DomainsOrderByWithRelationInputObjectSchema as DomainsOrderByWithRelationInputObjectSchema } from './DomainsOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  domainId: SortOrderSchema.optional(),
  version: SortOrderSchema.optional(),
  fields: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  isForSoftwareRoles: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  domain: z.lazy(() => DomainsOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const DefaultFormSchemaOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaOrderByWithRelationInput>;
export const DefaultFormSchemaOrderByWithRelationInputObjectZodSchema = makeSchema();
