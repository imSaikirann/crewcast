import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  equals: jsonSchema.optional(),
  not: jsonSchema.optional()
}).strict();
export const JsonFilterObjectSchema: z.ZodType<Prisma.JsonFilter> = makeSchema() as unknown as z.ZodType<Prisma.JsonFilter>;
export const JsonFilterObjectZodSchema = makeSchema();
