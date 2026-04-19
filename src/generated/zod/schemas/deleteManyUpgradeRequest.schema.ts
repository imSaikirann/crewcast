import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestWhereInputObjectSchema as UpgradeRequestWhereInputObjectSchema } from './objects/UpgradeRequestWhereInput.schema';

export const UpgradeRequestDeleteManySchema: z.ZodType<Prisma.UpgradeRequestDeleteManyArgs> = z.object({ where: UpgradeRequestWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestDeleteManyArgs>;

export const UpgradeRequestDeleteManyZodSchema = z.object({ where: UpgradeRequestWhereInputObjectSchema.optional() }).strict();