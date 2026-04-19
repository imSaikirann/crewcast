import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportOrderByWithRelationInputObjectSchema as JobReportOrderByWithRelationInputObjectSchema } from './objects/JobReportOrderByWithRelationInput.schema';
import { JobReportWhereInputObjectSchema as JobReportWhereInputObjectSchema } from './objects/JobReportWhereInput.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './objects/JobReportWhereUniqueInput.schema';
import { JobReportCountAggregateInputObjectSchema as JobReportCountAggregateInputObjectSchema } from './objects/JobReportCountAggregateInput.schema';

export const JobReportCountSchema: z.ZodType<Prisma.JobReportCountArgs> = z.object({ orderBy: z.union([JobReportOrderByWithRelationInputObjectSchema, JobReportOrderByWithRelationInputObjectSchema.array()]).optional(), where: JobReportWhereInputObjectSchema.optional(), cursor: JobReportWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), JobReportCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.JobReportCountArgs>;

export const JobReportCountZodSchema = z.object({ orderBy: z.union([JobReportOrderByWithRelationInputObjectSchema, JobReportOrderByWithRelationInputObjectSchema.array()]).optional(), where: JobReportWhereInputObjectSchema.optional(), cursor: JobReportWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), JobReportCountAggregateInputObjectSchema ]).optional() }).strict();