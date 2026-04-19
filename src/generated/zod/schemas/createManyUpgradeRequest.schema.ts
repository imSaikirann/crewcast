import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UpgradeRequestCreateManyInputObjectSchema as UpgradeRequestCreateManyInputObjectSchema } from './objects/UpgradeRequestCreateManyInput.schema';

export const UpgradeRequestCreateManySchema: z.ZodType<Prisma.UpgradeRequestCreateManyArgs> = z.object({ data: z.union([ UpgradeRequestCreateManyInputObjectSchema, z.array(UpgradeRequestCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.UpgradeRequestCreateManyArgs>;

export const UpgradeRequestCreateManyZodSchema = z.object({ data: z.union([ UpgradeRequestCreateManyInputObjectSchema, z.array(UpgradeRequestCreateManyInputObjectSchema) ]),  }).strict();