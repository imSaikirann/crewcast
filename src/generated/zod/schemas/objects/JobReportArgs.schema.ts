import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportSelectObjectSchema as JobReportSelectObjectSchema } from './JobReportSelect.schema';
import { JobReportIncludeObjectSchema as JobReportIncludeObjectSchema } from './JobReportInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => JobReportSelectObjectSchema).optional(),
  include: z.lazy(() => JobReportIncludeObjectSchema).optional()
}).strict();
export const JobReportArgsObjectSchema = makeSchema();
export const JobReportArgsObjectZodSchema = makeSchema();
