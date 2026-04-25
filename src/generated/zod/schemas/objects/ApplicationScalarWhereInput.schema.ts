import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { EnumApplicationStatusFilterObjectSchema as EnumApplicationStatusFilterObjectSchema } from './EnumApplicationStatusFilter.schema';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const applicationscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ApplicationScalarWhereInputObjectSchema), z.lazy(() => ApplicationScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ApplicationScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ApplicationScalarWhereInputObjectSchema), z.lazy(() => ApplicationScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  trackingToken: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  jobId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fullName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  responses: z.lazy(() => JsonFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => EnumApplicationStatusFilterObjectSchema), ApplicationStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ApplicationScalarWhereInputObjectSchema: z.ZodType<Prisma.ApplicationScalarWhereInput> = applicationscalarwhereinputSchema as unknown as z.ZodType<Prisma.ApplicationScalarWhereInput>;
export const ApplicationScalarWhereInputObjectZodSchema = applicationscalarwhereinputSchema;
