import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportWhereInputObjectSchema as JobReportWhereInputObjectSchema } from './JobReportWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => JobReportWhereInputObjectSchema).optional(),
  some: z.lazy(() => JobReportWhereInputObjectSchema).optional(),
  none: z.lazy(() => JobReportWhereInputObjectSchema).optional()
}).strict();
export const JobReportListRelationFilterObjectSchema: z.ZodType<Prisma.JobReportListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.JobReportListRelationFilter>;
export const JobReportListRelationFilterObjectZodSchema = makeSchema();
