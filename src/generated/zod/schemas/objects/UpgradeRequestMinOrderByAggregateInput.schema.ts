import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  company: SortOrderSchema.optional(),
  plan: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const UpgradeRequestMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UpgradeRequestMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UpgradeRequestMinOrderByAggregateInput>;
export const UpgradeRequestMinOrderByAggregateInputObjectZodSchema = makeSchema();
