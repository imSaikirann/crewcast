import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedJsonFilterObjectSchema as NestedJsonFilterObjectSchema } from './NestedJsonFilter.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  equals: jsonSchema.optional(),
  not: jsonSchema.optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterObjectSchema).optional()
}).strict();
export const JsonWithAggregatesFilterObjectSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.JsonWithAggregatesFilter>;
export const JsonWithAggregatesFilterObjectZodSchema = makeSchema();
