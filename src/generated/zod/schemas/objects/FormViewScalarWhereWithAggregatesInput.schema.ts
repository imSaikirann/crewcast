import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const formviewscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => FormViewScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FormViewScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FormViewScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FormViewScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FormViewScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  formId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  ip: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FormViewScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.FormViewScalarWhereWithAggregatesInput> = formviewscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.FormViewScalarWhereWithAggregatesInput>;
export const FormViewScalarWhereWithAggregatesInputObjectZodSchema = formviewscalarwherewithaggregatesinputSchema;
