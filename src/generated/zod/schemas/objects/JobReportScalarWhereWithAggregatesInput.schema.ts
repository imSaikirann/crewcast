import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const jobreportscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => JobReportScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => JobReportScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => JobReportScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => JobReportScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => JobReportScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  formId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  reason: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  message: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  ip: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const JobReportScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.JobReportScalarWhereWithAggregatesInput> = jobreportscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.JobReportScalarWhereWithAggregatesInput>;
export const JobReportScalarWhereWithAggregatesInputObjectZodSchema = jobreportscalarwherewithaggregatesinputSchema;
