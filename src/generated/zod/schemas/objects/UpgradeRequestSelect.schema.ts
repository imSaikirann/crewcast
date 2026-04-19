import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  email: z.boolean().optional(),
  company: z.boolean().optional(),
  plan: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const UpgradeRequestSelectObjectSchema: z.ZodType<Prisma.UpgradeRequestSelect> = makeSchema() as unknown as z.ZodType<Prisma.UpgradeRequestSelect>;
export const UpgradeRequestSelectObjectZodSchema = makeSchema();
