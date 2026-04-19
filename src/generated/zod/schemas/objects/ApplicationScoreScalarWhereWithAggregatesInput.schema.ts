import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema as FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const applicationscorescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ApplicationScoreScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ApplicationScoreScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ApplicationScoreScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ApplicationScoreScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ApplicationScoreScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  applicationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  totalScore: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  breakdown: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  evaluatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ApplicationScoreScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ApplicationScoreScalarWhereWithAggregatesInput> = applicationscorescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ApplicationScoreScalarWhereWithAggregatesInput>;
export const ApplicationScoreScalarWhereWithAggregatesInputObjectZodSchema = applicationscorescalarwherewithaggregatesinputSchema;
