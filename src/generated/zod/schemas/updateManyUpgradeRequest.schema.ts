import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestUpdateManyMutationInputObjectSchema as UpgradeRequestUpdateManyMutationInputObjectSchema } from './objects/UpgradeRequestUpdateManyMutationInput.schema';
import { UpgradeRequestWhereInputObjectSchema as UpgradeRequestWhereInputObjectSchema } from './objects/UpgradeRequestWhereInput.schema';

export const UpgradeRequestUpdateManySchema: z.ZodType<Prisma.UpgradeRequestUpdateManyArgs> = z.object({ data: UpgradeRequestUpdateManyMutationInputObjectSchema, where: UpgradeRequestWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestUpdateManyArgs>;

export const UpgradeRequestUpdateManyZodSchema = z.object({ data: UpgradeRequestUpdateManyMutationInputObjectSchema, where: UpgradeRequestWhereInputObjectSchema.optional() }).strict();