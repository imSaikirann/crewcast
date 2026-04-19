import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const applicationscorescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema), z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema), z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  applicationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  totalScore: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  breakdown: z.lazy(() => JsonFilterObjectSchema).optional(),
  evaluatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ApplicationScoreScalarWhereInputObjectSchema: z.ZodType<Prisma.ApplicationScoreScalarWhereInput> = applicationscorescalarwhereinputSchema as unknown as z.ZodType<Prisma.ApplicationScoreScalarWhereInput>;
export const ApplicationScoreScalarWhereInputObjectZodSchema = applicationscorescalarwhereinputSchema;
