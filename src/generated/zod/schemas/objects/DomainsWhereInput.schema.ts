import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecruiterFormListRelationFilterObjectSchema as RecruiterFormListRelationFilterObjectSchema } from './RecruiterFormListRelationFilter.schema';
import { DefaultFormSchemaListRelationFilterObjectSchema as DefaultFormSchemaListRelationFilterObjectSchema } from './DefaultFormSchemaListRelationFilter.schema'

const domainswhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DomainsWhereInputObjectSchema), z.lazy(() => DomainsWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DomainsWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DomainsWhereInputObjectSchema), z.lazy(() => DomainsWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  jobCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  haveDefaultForm: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  recruiterForms: z.lazy(() => RecruiterFormListRelationFilterObjectSchema).optional(),
  defaultFormSchemas: z.lazy(() => DefaultFormSchemaListRelationFilterObjectSchema).optional()
}).strict();
export const DomainsWhereInputObjectSchema: z.ZodType<Prisma.DomainsWhereInput> = domainswhereinputSchema as unknown as z.ZodType<Prisma.DomainsWhereInput>;
export const DomainsWhereInputObjectZodSchema = domainswhereinputSchema;
