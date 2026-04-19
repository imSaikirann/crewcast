import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormOrderByWithRelationInputObjectSchema as RecruiterFormOrderByWithRelationInputObjectSchema } from './objects/RecruiterFormOrderByWithRelationInput.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './objects/RecruiterFormWhereInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './objects/RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormCountAggregateInputObjectSchema as RecruiterFormCountAggregateInputObjectSchema } from './objects/RecruiterFormCountAggregateInput.schema';

export const RecruiterFormCountSchema: z.ZodType<Prisma.RecruiterFormCountArgs> = z.object({ orderBy: z.union([RecruiterFormOrderByWithRelationInputObjectSchema, RecruiterFormOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterFormWhereInputObjectSchema.optional(), cursor: RecruiterFormWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RecruiterFormCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterFormCountArgs>;

export const RecruiterFormCountZodSchema = z.object({ orderBy: z.union([RecruiterFormOrderByWithRelationInputObjectSchema, RecruiterFormOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterFormWhereInputObjectSchema.optional(), cursor: RecruiterFormWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RecruiterFormCountAggregateInputObjectSchema ]).optional() }).strict();