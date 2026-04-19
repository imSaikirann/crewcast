import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { EnumApplicationStatusFilterObjectSchema as EnumApplicationStatusFilterObjectSchema } from './EnumApplicationStatusFilter.schema';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecruiterFormScalarRelationFilterObjectSchema as RecruiterFormScalarRelationFilterObjectSchema } from './RecruiterFormScalarRelationFilter.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema';
import { ApplicationScoreListRelationFilterObjectSchema as ApplicationScoreListRelationFilterObjectSchema } from './ApplicationScoreListRelationFilter.schema'

const applicationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ApplicationWhereInputObjectSchema), z.lazy(() => ApplicationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ApplicationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ApplicationWhereInputObjectSchema), z.lazy(() => ApplicationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  jobId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  fullName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  responses: z.lazy(() => JsonFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => EnumApplicationStatusFilterObjectSchema), ApplicationStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  job: z.union([z.lazy(() => RecruiterFormScalarRelationFilterObjectSchema), z.lazy(() => RecruiterFormWhereInputObjectSchema)]).optional(),
  scores: z.lazy(() => ApplicationScoreListRelationFilterObjectSchema).optional()
}).strict();
export const ApplicationWhereInputObjectSchema: z.ZodType<Prisma.ApplicationWhereInput> = applicationwhereinputSchema as unknown as z.ZodType<Prisma.ApplicationWhereInput>;
export const ApplicationWhereInputObjectZodSchema = applicationwhereinputSchema;
