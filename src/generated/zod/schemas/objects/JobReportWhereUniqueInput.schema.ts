import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional()
}).strict();
export const JobReportWhereUniqueInputObjectSchema: z.ZodType<Prisma.JobReportWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportWhereUniqueInput>;
export const JobReportWhereUniqueInputObjectZodSchema = makeSchema();
