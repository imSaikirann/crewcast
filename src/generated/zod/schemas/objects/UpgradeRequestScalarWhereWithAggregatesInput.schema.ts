import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const upgraderequestscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UpgradeRequestScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UpgradeRequestScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UpgradeRequestScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UpgradeRequestScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UpgradeRequestScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  plan: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UpgradeRequestScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UpgradeRequestScalarWhereWithAggregatesInput> = upgraderequestscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UpgradeRequestScalarWhereWithAggregatesInput>;
export const UpgradeRequestScalarWhereWithAggregatesInputObjectZodSchema = upgraderequestscalarwherewithaggregatesinputSchema;
