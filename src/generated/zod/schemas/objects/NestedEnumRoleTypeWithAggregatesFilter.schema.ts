import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleTypeSchema } from '../enums/RoleType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRoleTypeFilterObjectSchema as NestedEnumRoleTypeFilterObjectSchema } from './NestedEnumRoleTypeFilter.schema'

const nestedenumroletypewithaggregatesfilterSchema = z.object({
  equals: RoleTypeSchema.optional(),
  in: RoleTypeSchema.array().optional(),
  notIn: RoleTypeSchema.array().optional(),
  not: z.union([RoleTypeSchema, z.lazy(() => NestedEnumRoleTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumRoleTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleTypeWithAggregatesFilter> = nestedenumroletypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumRoleTypeWithAggregatesFilter>;
export const NestedEnumRoleTypeWithAggregatesFilterObjectZodSchema = nestedenumroletypewithaggregatesfilterSchema;
