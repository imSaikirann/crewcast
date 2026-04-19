import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RoleScalarRelationFilterObjectSchema as RoleScalarRelationFilterObjectSchema } from './RoleScalarRelationFilter.schema';
import { RoleWhereInputObjectSchema as RoleWhereInputObjectSchema } from './RoleWhereInput.schema'

const formfieldwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FormFieldWhereInputObjectSchema), z.lazy(() => FormFieldWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FormFieldWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FormFieldWhereInputObjectSchema), z.lazy(() => FormFieldWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  roleId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  label: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  required: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  options: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  role: z.union([z.lazy(() => RoleScalarRelationFilterObjectSchema), z.lazy(() => RoleWhereInputObjectSchema)]).optional()
}).strict();
export const FormFieldWhereInputObjectSchema: z.ZodType<Prisma.FormFieldWhereInput> = formfieldwhereinputSchema as unknown as z.ZodType<Prisma.FormFieldWhereInput>;
export const FormFieldWhereInputObjectZodSchema = formfieldwhereinputSchema;
