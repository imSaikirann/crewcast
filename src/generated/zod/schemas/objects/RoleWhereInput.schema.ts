import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { FormFieldListRelationFilterObjectSchema as FormFieldListRelationFilterObjectSchema } from './FormFieldListRelationFilter.schema'

const rolewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RoleWhereInputObjectSchema), z.lazy(() => RoleWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RoleWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RoleWhereInputObjectSchema), z.lazy(() => RoleWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  fields: z.lazy(() => FormFieldListRelationFilterObjectSchema).optional()
}).strict();
export const RoleWhereInputObjectSchema: z.ZodType<Prisma.RoleWhereInput> = rolewhereinputSchema as unknown as z.ZodType<Prisma.RoleWhereInput>;
export const RoleWhereInputObjectZodSchema = rolewhereinputSchema;
