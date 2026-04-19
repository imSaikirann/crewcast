import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportOrderByWithRelationInputObjectSchema as JobReportOrderByWithRelationInputObjectSchema } from './objects/JobReportOrderByWithRelationInput.schema';
import { JobReportWhereInputObjectSchema as JobReportWhereInputObjectSchema } from './objects/JobReportWhereInput.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './objects/JobReportWhereUniqueInput.schema';
import { JobReportCountAggregateInputObjectSchema as JobReportCountAggregateInputObjectSchema } from './objects/JobReportCountAggregateInput.schema';
import { JobReportMinAggregateInputObjectSchema as JobReportMinAggregateInputObjectSchema } from './objects/JobReportMinAggregateInput.schema';
import { JobReportMaxAggregateInputObjectSchema as JobReportMaxAggregateInputObjectSchema } from './objects/JobReportMaxAggregateInput.schema';

export const JobReportAggregateSchema: z.ZodType<Prisma.JobReportAggregateArgs> = z.object({ orderBy: z.union([JobReportOrderByWithRelationInputObjectSchema, JobReportOrderByWithRelationInputObjectSchema.array()]).optional(), where: JobReportWhereInputObjectSchema.optional(), cursor: JobReportWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), JobReportCountAggregateInputObjectSchema ]).optional(), _min: JobReportMinAggregateInputObjectSchema.optional(), _max: JobReportMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.JobReportAggregateArgs>;

export const JobReportAggregateZodSchema = z.object({ orderBy: z.union([JobReportOrderByWithRelationInputObjectSchema, JobReportOrderByWithRelationInputObjectSchema.array()]).optional(), where: JobReportWhereInputObjectSchema.optional(), cursor: JobReportWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), JobReportCountAggregateInputObjectSchema ]).optional(), _min: JobReportMinAggregateInputObjectSchema.optional(), _max: JobReportMaxAggregateInputObjectSchema.optional() }).strict();