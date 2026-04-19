import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCountOutputTypeCountApplicationsArgsObjectSchema as RecruiterFormCountOutputTypeCountApplicationsArgsObjectSchema } from './RecruiterFormCountOutputTypeCountApplicationsArgs.schema';
import { RecruiterFormCountOutputTypeCountViewsArgsObjectSchema as RecruiterFormCountOutputTypeCountViewsArgsObjectSchema } from './RecruiterFormCountOutputTypeCountViewsArgs.schema';
import { RecruiterFormCountOutputTypeCountJobReportArgsObjectSchema as RecruiterFormCountOutputTypeCountJobReportArgsObjectSchema } from './RecruiterFormCountOutputTypeCountJobReportArgs.schema'

const makeSchema = () => z.object({
  applications: z.union([z.boolean(), z.lazy(() => RecruiterFormCountOutputTypeCountApplicationsArgsObjectSchema)]).optional(),
  views: z.union([z.boolean(), z.lazy(() => RecruiterFormCountOutputTypeCountViewsArgsObjectSchema)]).optional(),
  jobReport: z.union([z.boolean(), z.lazy(() => RecruiterFormCountOutputTypeCountJobReportArgsObjectSchema)]).optional()
}).strict();
export const RecruiterFormCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RecruiterFormCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCountOutputTypeSelect>;
export const RecruiterFormCountOutputTypeSelectObjectZodSchema = makeSchema();
