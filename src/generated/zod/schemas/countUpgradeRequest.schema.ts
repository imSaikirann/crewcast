import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestOrderByWithRelationInputObjectSchema as UpgradeRequestOrderByWithRelationInputObjectSchema } from './objects/UpgradeRequestOrderByWithRelationInput.schema';
import { UpgradeRequestWhereInputObjectSchema as UpgradeRequestWhereInputObjectSchema } from './objects/UpgradeRequestWhereInput.schema';
import { UpgradeRequestWhereUniqueInputObjectSchema as UpgradeRequestWhereUniqueInputObjectSchema } from './objects/UpgradeRequestWhereUniqueInput.schema';
import { UpgradeRequestCountAggregateInputObjectSchema as UpgradeRequestCountAggregateInputObjectSchema } from './objects/UpgradeRequestCountAggregateInput.schema';

export const UpgradeRequestCountSchema: z.ZodType<Prisma.UpgradeRequestCountArgs> = z.object({ orderBy: z.union([UpgradeRequestOrderByWithRelationInputObjectSchema, UpgradeRequestOrderByWithRelationInputObjectSchema.array()]).optional(), where: UpgradeRequestWhereInputObjectSchema.optional(), cursor: UpgradeRequestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UpgradeRequestCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestCountArgs>;

export const UpgradeRequestCountZodSchema = z.object({ orderBy: z.union([UpgradeRequestOrderByWithRelationInputObjectSchema, UpgradeRequestOrderByWithRelationInputObjectSchema.array()]).optional(), where: UpgradeRequestWhereInputObjectSchema.optional(), cursor: UpgradeRequestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UpgradeRequestCountAggregateInputObjectSchema ]).optional() }).strict();