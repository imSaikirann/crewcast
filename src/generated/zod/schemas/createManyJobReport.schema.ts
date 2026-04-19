import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportCreateManyInputObjectSchema as JobReportCreateManyInputObjectSchema } from './objects/JobReportCreateManyInput.schema';

export const JobReportCreateManySchema: z.ZodType<Prisma.JobReportCreateManyArgs> = z.object({ data: z.union([ JobReportCreateManyInputObjectSchema, z.array(JobReportCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.JobReportCreateManyArgs>;

export const JobReportCreateManyZodSchema = z.object({ data: z.union([ JobReportCreateManyInputObjectSchema, z.array(JobReportCreateManyInputObjectSchema) ]),  }).strict();