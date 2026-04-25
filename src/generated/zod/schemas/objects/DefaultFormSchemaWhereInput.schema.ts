import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DomainsScalarRelationFilterObjectSchema as DomainsScalarRelationFilterObjectSchema } from './DomainsScalarRelationFilter.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './DomainsWhereInput.schema'

const defaultformschemawhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DefaultFormSchemaWhereInputObjectSchema), z.lazy(() => DefaultFormSchemaWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DefaultFormSchemaWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DefaultFormSchemaWhereInputObjectSchema), z.lazy(() => DefaultFormSchemaWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  domainId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  version: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  fields: z.lazy(() => JsonFilterObjectSchema).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  isForSoftwareRoles: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  domain: z.union([z.lazy(() => DomainsScalarRelationFilterObjectSchema), z.lazy(() => DomainsWhereInputObjectSchema)]).optional()
}).strict();
export const DefaultFormSchemaWhereInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaWhereInput> = defaultformschemawhereinputSchema as unknown as z.ZodType<Prisma.DefaultFormSchemaWhereInput>;
export const DefaultFormSchemaWhereInputObjectZodSchema = defaultformschemawhereinputSchema;
