import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormArgsObjectSchema as RecruiterFormArgsObjectSchema } from './RecruiterFormArgs.schema'

const makeSchema = () => z.object({
  form: z.union([z.boolean(), z.lazy(() => RecruiterFormArgsObjectSchema)]).optional()
}).strict();
export const JobReportIncludeObjectSchema: z.ZodType<Prisma.JobReportInclude> = makeSchema() as unknown as z.ZodType<Prisma.JobReportInclude>;
export const JobReportIncludeObjectZodSchema = makeSchema();
