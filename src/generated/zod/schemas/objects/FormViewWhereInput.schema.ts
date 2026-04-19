import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecruiterFormScalarRelationFilterObjectSchema as RecruiterFormScalarRelationFilterObjectSchema } from './RecruiterFormScalarRelationFilter.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const formviewwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FormViewWhereInputObjectSchema), z.lazy(() => FormViewWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FormViewWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FormViewWhereInputObjectSchema), z.lazy(() => FormViewWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  formId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  ip: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  form: z.union([z.lazy(() => RecruiterFormScalarRelationFilterObjectSchema), z.lazy(() => RecruiterFormWhereInputObjectSchema)]).optional()
}).strict();
export const FormViewWhereInputObjectSchema: z.ZodType<Prisma.FormViewWhereInput> = formviewwhereinputSchema as unknown as z.ZodType<Prisma.FormViewWhereInput>;
export const FormViewWhereInputObjectZodSchema = formviewwhereinputSchema;
