import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const upgraderequestwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UpgradeRequestWhereInputObjectSchema), z.lazy(() => UpgradeRequestWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UpgradeRequestWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UpgradeRequestWhereInputObjectSchema), z.lazy(() => UpgradeRequestWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  plan: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UpgradeRequestWhereInputObjectSchema: z.ZodType<Prisma.UpgradeRequestWhereInput> = upgraderequestwhereinputSchema as unknown as z.ZodType<Prisma.UpgradeRequestWhereInput>;
export const UpgradeRequestWhereInputObjectZodSchema = upgraderequestwhereinputSchema;
