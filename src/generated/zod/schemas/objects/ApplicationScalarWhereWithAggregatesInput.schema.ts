import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { EnumApplicationStatusWithAggregatesFilterObjectSchema as EnumApplicationStatusWithAggregatesFilterObjectSchema } from './EnumApplicationStatusWithAggregatesFilter.schema';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const applicationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  trackingToken: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  jobId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  fullName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  responses: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => EnumApplicationStatusWithAggregatesFilterObjectSchema), ApplicationStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ApplicationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ApplicationScalarWhereWithAggregatesInput> = applicationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ApplicationScalarWhereWithAggregatesInput>;
export const ApplicationScalarWhereWithAggregatesInputObjectZodSchema = applicationscalarwherewithaggregatesinputSchema;
