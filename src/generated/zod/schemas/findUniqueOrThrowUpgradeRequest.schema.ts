import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestSelectObjectSchema as UpgradeRequestSelectObjectSchema } from './objects/UpgradeRequestSelect.schema';
import { UpgradeRequestWhereUniqueInputObjectSchema as UpgradeRequestWhereUniqueInputObjectSchema } from './objects/UpgradeRequestWhereUniqueInput.schema';

export const UpgradeRequestFindUniqueOrThrowSchema: z.ZodType<Prisma.UpgradeRequestFindUniqueOrThrowArgs> = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  where: UpgradeRequestWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestFindUniqueOrThrowArgs>;

export const UpgradeRequestFindUniqueOrThrowZodSchema = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  where: UpgradeRequestWhereUniqueInputObjectSchema }).strict();