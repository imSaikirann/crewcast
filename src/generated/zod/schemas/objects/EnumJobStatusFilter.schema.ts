import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { NestedEnumJobStatusFilterObjectSchema as NestedEnumJobStatusFilterObjectSchema } from './NestedEnumJobStatusFilter.schema'

const makeSchema = () => z.object({
  equals: JobStatusSchema.optional(),
  in: JobStatusSchema.array().optional(),
  notIn: JobStatusSchema.array().optional(),
  not: z.union([JobStatusSchema, z.lazy(() => NestedEnumJobStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumJobStatusFilterObjectSchema: z.ZodType<Prisma.EnumJobStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumJobStatusFilter>;
export const EnumJobStatusFilterObjectZodSchema = makeSchema();
