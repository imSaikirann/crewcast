import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportWhereInputObjectSchema as JobReportWhereInputObjectSchema } from './JobReportWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => JobReportWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormCountOutputTypeCountJobReportArgsObjectSchema = makeSchema();
export const RecruiterFormCountOutputTypeCountJobReportArgsObjectZodSchema = makeSchema();
