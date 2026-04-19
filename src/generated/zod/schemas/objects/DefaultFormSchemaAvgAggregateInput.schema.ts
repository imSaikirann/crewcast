import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  version: z.literal(true).optional()
}).strict();
export const DefaultFormSchemaAvgAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaAvgAggregateInputType>;
export const DefaultFormSchemaAvgAggregateInputObjectZodSchema = makeSchema();
