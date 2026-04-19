import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterArgsObjectSchema as RecruiterArgsObjectSchema } from './RecruiterArgs.schema';
import { DomainsArgsObjectSchema as DomainsArgsObjectSchema } from './DomainsArgs.schema';
import { ApplicationFindManySchema as ApplicationFindManySchema } from '../findManyApplication.schema';
import { FormViewFindManySchema as FormViewFindManySchema } from '../findManyFormView.schema';
import { JobReportFindManySchema as JobReportFindManySchema } from '../findManyJobReport.schema';
import { RecruiterFormCountOutputTypeArgsObjectSchema as RecruiterFormCountOutputTypeArgsObjectSchema } from './RecruiterFormCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  recruiter: z.union([z.boolean(), z.lazy(() => RecruiterArgsObjectSchema)]).optional(),
  domain: z.union([z.boolean(), z.lazy(() => DomainsArgsObjectSchema)]).optional(),
  applications: z.union([z.boolean(), z.lazy(() => ApplicationFindManySchema)]).optional(),
  views: z.union([z.boolean(), z.lazy(() => FormViewFindManySchema)]).optional(),
  jobReport: z.union([z.boolean(), z.lazy(() => JobReportFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RecruiterFormCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RecruiterFormIncludeObjectSchema: z.ZodType<Prisma.RecruiterFormInclude> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormInclude>;
export const RecruiterFormIncludeObjectZodSchema = makeSchema();
