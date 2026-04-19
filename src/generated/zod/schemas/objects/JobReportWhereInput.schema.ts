import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecruiterFormScalarRelationFilterObjectSchema as RecruiterFormScalarRelationFilterObjectSchema } from './RecruiterFormScalarRelationFilter.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const jobreportwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => JobReportWhereInputObjectSchema), z.lazy(() => JobReportWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => JobReportWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => JobReportWhereInputObjectSchema), z.lazy(() => JobReportWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  formId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  reason: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  message: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  ip: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  form: z.union([z.lazy(() => RecruiterFormScalarRelationFilterObjectSchema), z.lazy(() => RecruiterFormWhereInputObjectSchema)]).optional()
}).strict();
export const JobReportWhereInputObjectSchema: z.ZodType<Prisma.JobReportWhereInput> = jobreportwhereinputSchema as unknown as z.ZodType<Prisma.JobReportWhereInput>;
export const JobReportWhereInputObjectZodSchema = jobreportwhereinputSchema;
