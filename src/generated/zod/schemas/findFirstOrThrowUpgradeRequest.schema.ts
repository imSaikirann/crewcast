import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestOrderByWithRelationInputObjectSchema as UpgradeRequestOrderByWithRelationInputObjectSchema } from './objects/UpgradeRequestOrderByWithRelationInput.schema';
import { UpgradeRequestWhereInputObjectSchema as UpgradeRequestWhereInputObjectSchema } from './objects/UpgradeRequestWhereInput.schema';
import { UpgradeRequestWhereUniqueInputObjectSchema as UpgradeRequestWhereUniqueInputObjectSchema } from './objects/UpgradeRequestWhereUniqueInput.schema';
import { UpgradeRequestScalarFieldEnumSchema } from './enums/UpgradeRequestScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UpgradeRequestFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UpgradeRequestSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    email: z.boolean().optional(),
    company: z.boolean().optional(),
    plan: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestSelect>;

export const UpgradeRequestFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    email: z.boolean().optional(),
    company: z.boolean().optional(),
    plan: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const UpgradeRequestFindFirstOrThrowSchema: z.ZodType<Prisma.UpgradeRequestFindFirstOrThrowArgs> = z.object({ select: UpgradeRequestFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UpgradeRequestOrderByWithRelationInputObjectSchema, UpgradeRequestOrderByWithRelationInputObjectSchema.array()]).optional(), where: UpgradeRequestWhereInputObjectSchema.optional(), cursor: UpgradeRequestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UpgradeRequestScalarFieldEnumSchema, UpgradeRequestScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestFindFirstOrThrowArgs>;

export const UpgradeRequestFindFirstOrThrowZodSchema = z.object({ select: UpgradeRequestFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UpgradeRequestOrderByWithRelationInputObjectSchema, UpgradeRequestOrderByWithRelationInputObjectSchema.array()]).optional(), where: UpgradeRequestWhereInputObjectSchema.optional(), cursor: UpgradeRequestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UpgradeRequestScalarFieldEnumSchema, UpgradeRequestScalarFieldEnumSchema.array()]).optional() }).strict();