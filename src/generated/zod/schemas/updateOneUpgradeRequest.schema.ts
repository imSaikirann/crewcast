import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestSelectObjectSchema as UpgradeRequestSelectObjectSchema } from './objects/UpgradeRequestSelect.schema';
import { UpgradeRequestUpdateInputObjectSchema as UpgradeRequestUpdateInputObjectSchema } from './objects/UpgradeRequestUpdateInput.schema';
import { UpgradeRequestUncheckedUpdateInputObjectSchema as UpgradeRequestUncheckedUpdateInputObjectSchema } from './objects/UpgradeRequestUncheckedUpdateInput.schema';
import { UpgradeRequestWhereUniqueInputObjectSchema as UpgradeRequestWhereUniqueInputObjectSchema } from './objects/UpgradeRequestWhereUniqueInput.schema';

export const UpgradeRequestUpdateOneSchema: z.ZodType<Prisma.UpgradeRequestUpdateArgs> = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  data: z.union([UpgradeRequestUpdateInputObjectSchema, UpgradeRequestUncheckedUpdateInputObjectSchema]), where: UpgradeRequestWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestUpdateArgs>;

export const UpgradeRequestUpdateOneZodSchema = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  data: z.union([UpgradeRequestUpdateInputObjectSchema, UpgradeRequestUncheckedUpdateInputObjectSchema]), where: UpgradeRequestWhereUniqueInputObjectSchema }).strict();