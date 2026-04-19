import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './ApplicationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
  some: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
  none: z.lazy(() => ApplicationWhereInputObjectSchema).optional()
}).strict();
export const ApplicationListRelationFilterObjectSchema: z.ZodType<Prisma.ApplicationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationListRelationFilter>;
export const ApplicationListRelationFilterObjectZodSchema = makeSchema();
