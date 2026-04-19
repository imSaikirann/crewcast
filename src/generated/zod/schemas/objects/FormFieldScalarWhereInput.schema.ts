import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const formfieldscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FormFieldScalarWhereInputObjectSchema), z.lazy(() => FormFieldScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FormFieldScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FormFieldScalarWhereInputObjectSchema), z.lazy(() => FormFieldScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  roleId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  label: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  required: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  options: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FormFieldScalarWhereInputObjectSchema: z.ZodType<Prisma.FormFieldScalarWhereInput> = formfieldscalarwhereinputSchema as unknown as z.ZodType<Prisma.FormFieldScalarWhereInput>;
export const FormFieldScalarWhereInputObjectZodSchema = formfieldscalarwhereinputSchema;
