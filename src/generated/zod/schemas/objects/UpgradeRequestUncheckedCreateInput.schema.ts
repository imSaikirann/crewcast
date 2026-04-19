import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  userId: z.string().max(24),
  email: z.string(),
  company: z.string(),
  plan: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const UpgradeRequestUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UpgradeRequestUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UpgradeRequestUncheckedCreateInput>;
export const UpgradeRequestUncheckedCreateInputObjectZodSchema = makeSchema();
