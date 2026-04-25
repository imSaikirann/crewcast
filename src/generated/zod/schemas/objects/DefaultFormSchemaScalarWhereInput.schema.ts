import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const defaultformschemascalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema), z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema), z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  domainId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  version: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  fields: z.lazy(() => JsonFilterObjectSchema).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DefaultFormSchemaScalarWhereInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaScalarWhereInput> = defaultformschemascalarwhereinputSchema as unknown as z.ZodType<Prisma.DefaultFormSchemaScalarWhereInput>;
export const DefaultFormSchemaScalarWhereInputObjectZodSchema = defaultformschemascalarwhereinputSchema;
