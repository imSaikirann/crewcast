import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ApplicationScalarRelationFilterObjectSchema as ApplicationScalarRelationFilterObjectSchema } from './ApplicationScalarRelationFilter.schema';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './ApplicationWhereInput.schema'

const applicationscorewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ApplicationScoreWhereInputObjectSchema), z.lazy(() => ApplicationScoreWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ApplicationScoreWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ApplicationScoreWhereInputObjectSchema), z.lazy(() => ApplicationScoreWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  applicationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  totalScore: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  breakdown: z.lazy(() => JsonFilterObjectSchema).optional(),
  evaluatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  application: z.union([z.lazy(() => ApplicationScalarRelationFilterObjectSchema), z.lazy(() => ApplicationWhereInputObjectSchema)]).optional()
}).strict();
export const ApplicationScoreWhereInputObjectSchema: z.ZodType<Prisma.ApplicationScoreWhereInput> = applicationscorewhereinputSchema as unknown as z.ZodType<Prisma.ApplicationScoreWhereInput>;
export const ApplicationScoreWhereInputObjectZodSchema = applicationscorewhereinputSchema;
