import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestSelectObjectSchema as UpgradeRequestSelectObjectSchema } from './objects/UpgradeRequestSelect.schema';
import { UpgradeRequestCreateInputObjectSchema as UpgradeRequestCreateInputObjectSchema } from './objects/UpgradeRequestCreateInput.schema';
import { UpgradeRequestUncheckedCreateInputObjectSchema as UpgradeRequestUncheckedCreateInputObjectSchema } from './objects/UpgradeRequestUncheckedCreateInput.schema';

export const UpgradeRequestCreateOneSchema: z.ZodType<Prisma.UpgradeRequestCreateArgs> = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  data: z.union([UpgradeRequestCreateInputObjectSchema, UpgradeRequestUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestCreateArgs>;

export const UpgradeRequestCreateOneZodSchema = z.object({ select: UpgradeRequestSelectObjectSchema.optional(),  data: z.union([UpgradeRequestCreateInputObjectSchema, UpgradeRequestUncheckedCreateInputObjectSchema]) }).strict();