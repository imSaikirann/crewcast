import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  version: z.literal(true).optional()
}).strict();
export const DefaultFormSchemaSumAggregateInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaSumAggregateInputType>;
export const DefaultFormSchemaSumAggregateInputObjectZodSchema = makeSchema();
