import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const rolescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RoleScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RoleScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RoleScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RoleScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RoleScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  isActive: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const RoleScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput> = rolescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput>;
export const RoleScalarWhereWithAggregatesInputObjectZodSchema = rolescalarwherewithaggregatesinputSchema;
