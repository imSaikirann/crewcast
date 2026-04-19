import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  domainId: z.literal(true).optional(),
  version: z.literal(true).optional(),
  fields: z.literal(true).optional(),
  isActive: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const DefaultFormSchemaCountAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaCountAggregateInputType>;
export const DefaultFormSchemaCountAggregateInputObjectZodSchema = makeSchema();
