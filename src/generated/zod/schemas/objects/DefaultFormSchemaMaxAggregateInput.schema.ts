import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  domainId: z.literal(true).optional(),
  version: z.literal(true).optional(),
  isActive: z.literal(true).optional(),
  isForSoftwareRoles: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const DefaultFormSchemaMaxAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaMaxAggregateInputType>;
export const DefaultFormSchemaMaxAggregateInputObjectZodSchema = makeSchema();
