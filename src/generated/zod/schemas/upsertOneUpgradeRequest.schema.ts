import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestSelectObjectSchema as UpgradeRequestSelectObjectSchema } from './objects/UpgradeRequestSelect.schema';
import { UpgradeRequestWhereUniqueInputObjectSchema as UpgradeRequestWhereUniqueInputObjectSchema } from './objects/UpgradeRequestWhereUniqueInput.schema';
import { UpgradeRequestCreateInputObjectSchema as UpgradeRequestCreateInputObjectSchema } from './objects/UpgradeRequestCreateInput.schema';
import { UpgradeRequestUncheckedCreateInputObjectSchema as UpgradeRequestUncheckedCreateInputObjectSchema } from './objects/UpgradeRequestUncheckedCreateInput.schema';
import { UpgradeRequestUpdateInputObjectSchema as UpgradeRequestUpdateInputObjectSchema } from './objects/UpgradeRequestUpdateInput.schema';
import { UpgradeRequestUncheckedUpdateInputObjectSchema as UpgradeRequestUncheckedUpdateInputObjectSchema } from './objects/UpgradeRequestUncheckedUpdateInput.schema';

export const UpgradeRequestUpsertOneSchema: z.ZodType<Prisma.UpgradeRequestUpsertArgs> = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  where: UpgradeRequestWhereUniqueInputObjectSchema, create: z.union([ UpgradeRequestCreateInputObjectSchema, UpgradeRequestUncheckedCreateInputObjectSchema ]), update: z.union([ UpgradeRequestUpdateInputObjectSchema, UpgradeRequestUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestUpsertArgs>;

export const UpgradeRequestUpsertOneZodSchema = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  where: UpgradeRequestWhereUniqueInputObjectSchema, create: z.union([ UpgradeRequestCreateInputObjectSchema, UpgradeRequestUncheckedCreateInputObjectSchema ]), update: z.union([ UpgradeRequestUpdateInputObjectSchema, UpgradeRequestUncheckedUpdateInputObjectSchema ]) }).strict();