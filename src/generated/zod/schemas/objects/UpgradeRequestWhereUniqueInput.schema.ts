import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional()
}).strict();
export const UpgradeRequestWhereUniqueInputObjectSchema: z.ZodType<Prisma.UpgradeRequestWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UpgradeRequestWhereUniqueInput>;
export const UpgradeRequestWhereUniqueInputObjectZodSchema = makeSchema();
