import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const jobreportscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => JobReportScalarWhereInputObjectSchema), z.lazy(() => JobReportScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => JobReportScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => JobReportScalarWhereInputObjectSchema), z.lazy(() => JobReportScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  formId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  reason: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  message: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  ip: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const JobReportScalarWhereInputObjectSchema: z.ZodType<Prisma.JobReportScalarWhereInput> = jobreportscalarwhereinputSchema as unknown as z.ZodType<Prisma.JobReportScalarWhereInput>;
export const JobReportScalarWhereInputObjectZodSchema = jobreportscalarwhereinputSchema;
