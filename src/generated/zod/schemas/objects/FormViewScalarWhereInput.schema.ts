import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const formviewscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FormViewScalarWhereInputObjectSchema), z.lazy(() => FormViewScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FormViewScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FormViewScalarWhereInputObjectSchema), z.lazy(() => FormViewScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  formId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  ip: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FormViewScalarWhereInputObjectSchema: z.ZodType<Prisma.FormViewScalarWhereInput> = formviewscalarwhereinputSchema as unknown as z.ZodType<Prisma.FormViewScalarWhereInput>;
export const FormViewScalarWhereInputObjectZodSchema = formviewscalarwhereinputSchema;
