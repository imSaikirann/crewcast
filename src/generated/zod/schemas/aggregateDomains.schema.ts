import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsOrderByWithRelationInputObjectSchema as DomainsOrderByWithRelationInputObjectSchema } from './objects/DomainsOrderByWithRelationInput.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './objects/DomainsWhereInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './objects/DomainsWhereUniqueInput.schema';
import { DomainsCountAggregateInputObjectSchema as DomainsCountAggregateInputObjectSchema } from './objects/DomainsCountAggregateInput.schema';
import { DomainsMinAggregateInputObjectSchema as DomainsMinAggregateInputObjectSchema } from './objects/DomainsMinAggregateInput.schema';
import { DomainsMaxAggregateInputObjectSchema as DomainsMaxAggregateInputObjectSchema } from './objects/DomainsMaxAggregateInput.schema';
import { DomainsAvgAggregateInputObjectSchema as DomainsAvgAggregateInputObjectSchema } from './objects/DomainsAvgAggregateInput.schema';
import { DomainsSumAggregateInputObjectSchema as DomainsSumAggregateInputObjectSchema } from './objects/DomainsSumAggregateInput.schema';

export const DomainsAggregateSchema: z.ZodType<Prisma.DomainsAggregateArgs> = z.object({ orderBy: z.union([DomainsOrderByWithRelationInputObjectSchema, DomainsOrderByWithRelationInputObjectSchema.array()]).optional(), where: DomainsWhereInputObjectSchema.optional(), cursor: DomainsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), DomainsCountAggregateInputObjectSchema ]).optional(), _min: DomainsMinAggregateInputObjectSchema.optional(), _max: DomainsMaxAggregateInputObjectSchema.optional(), _avg: DomainsAvgAggregateInputObjectSchema.optional(), _sum: DomainsSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DomainsAggregateArgs>;

export const DomainsAggregateZodSchema = z.object({ orderBy: z.union([DomainsOrderByWithRelationInputObjectSchema, DomainsOrderByWithRelationInputObjectSchema.array()]).optional(), where: DomainsWhereInputObjectSchema.optional(), cursor: DomainsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), DomainsCountAggregateInputObjectSchema ]).optional(), _min: DomainsMinAggregateInputObjectSchema.optional(), _max: DomainsMaxAggregateInputObjectSchema.optional(), _avg: DomainsAvgAggregateInputObjectSchema.optional(), _sum: DomainsSumAggregateInputObjectSchema.optional() }).strict();