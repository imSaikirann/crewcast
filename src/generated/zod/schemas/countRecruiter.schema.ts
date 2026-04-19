import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterOrderByWithRelationInputObjectSchema as RecruiterOrderByWithRelationInputObjectSchema } from './objects/RecruiterOrderByWithRelationInput.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './objects/RecruiterWhereInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './objects/RecruiterWhereUniqueInput.schema';
import { RecruiterCountAggregateInputObjectSchema as RecruiterCountAggregateInputObjectSchema } from './objects/RecruiterCountAggregateInput.schema';

export const RecruiterCountSchema: z.ZodType<Prisma.RecruiterCountArgs> = z.object({ orderBy: z.union([RecruiterOrderByWithRelationInputObjectSchema, RecruiterOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterWhereInputObjectSchema.optional(), cursor: RecruiterWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RecruiterCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterCountArgs>;

export const RecruiterCountZodSchema = z.object({ orderBy: z.union([RecruiterOrderByWithRelationInputObjectSchema, RecruiterOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterWhereInputObjectSchema.optional(), cursor: RecruiterWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RecruiterCountAggregateInputObjectSchema ]).optional() }).strict();