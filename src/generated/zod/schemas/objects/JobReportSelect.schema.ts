import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormArgsObjectSchema as RecruiterFormArgsObjectSchema } from './RecruiterFormArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  formId: z.boolean().optional(),
  form: z.union([z.boolean(), z.lazy(() => RecruiterFormArgsObjectSchema)]).optional(),
  reason: z.boolean().optional(),
  message: z.boolean().optional(),
  ip: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const JobReportSelectObjectSchema: z.ZodType<Prisma.JobReportSelect> = makeSchema() as unknown as z.ZodType<Prisma.JobReportSelect>;
export const JobReportSelectObjectZodSchema = makeSchema();
