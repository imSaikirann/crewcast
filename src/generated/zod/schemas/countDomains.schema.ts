import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsOrderByWithRelationInputObjectSchema as DomainsOrderByWithRelationInputObjectSchema } from './objects/DomainsOrderByWithRelationInput.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './objects/DomainsWhereInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './objects/DomainsWhereUniqueInput.schema';
import { DomainsCountAggregateInputObjectSchema as DomainsCountAggregateInputObjectSchema } from './objects/DomainsCountAggregateInput.schema';

export const DomainsCountSchema: z.ZodType<Prisma.DomainsCountArgs> = z.object({ orderBy: z.union([DomainsOrderByWithRelationInputObjectSchema, DomainsOrderByWithRelationInputObjectSchema.array()]).optional(), where: DomainsWhereInputObjectSchema.optional(), cursor: DomainsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DomainsCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.DomainsCountArgs>;

export const DomainsCountZodSchema = z.object({ orderBy: z.union([DomainsOrderByWithRelationInputObjectSchema, DomainsOrderByWithRelationInputObjectSchema.array()]).optional(), where: DomainsWhereInputObjectSchema.optional(), cursor: DomainsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DomainsCountAggregateInputObjectSchema ]).optional() }).strict();