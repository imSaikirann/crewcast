import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const domainsscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => DomainsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DomainsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DomainsScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DomainsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DomainsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  jobCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  haveDefaultForm: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  isActive: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DomainsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.DomainsScalarWhereWithAggregatesInput> = domainsscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.DomainsScalarWhereWithAggregatesInput>;
export const DomainsScalarWhereWithAggregatesInputObjectZodSchema = domainsscalarwherewithaggregatesinputSchema;
