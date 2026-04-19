import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const formfieldscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => FormFieldScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FormFieldScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FormFieldScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FormFieldScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FormFieldScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  roleId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  label: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  required: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  options: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FormFieldScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.FormFieldScalarWhereWithAggregatesInput> = formfieldscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.FormFieldScalarWhereWithAggregatesInput>;
export const FormFieldScalarWhereWithAggregatesInputObjectZodSchema = formfieldscalarwherewithaggregatesinputSchema;
