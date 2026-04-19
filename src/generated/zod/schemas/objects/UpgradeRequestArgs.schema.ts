import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UpgradeRequestSelectObjectSchema as UpgradeRequestSelectObjectSchema } from './UpgradeRequestSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UpgradeRequestSelectObjectSchema).optional()
}).strict();
export const UpgradeRequestArgsObjectSchema = makeSchema();
export const UpgradeRequestArgsObjectZodSchema = makeSchema();
