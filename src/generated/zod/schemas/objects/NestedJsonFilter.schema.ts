import * as z from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  equals: jsonSchema.optional(),
  not: jsonSchema.optional()
}).strict();
export const NestedJsonFilterObjectSchema: z.ZodType<Prisma.NestedJsonFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedJsonFilter>;
export const NestedJsonFilterObjectZodSchema = makeSchema();
