import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleTypeSchema } from '../enums/RoleType.schema';
import { NestedEnumRoleTypeFilterObjectSchema as NestedEnumRoleTypeFilterObjectSchema } from './NestedEnumRoleTypeFilter.schema'

const makeSchema = () => z.object({
  equals: RoleTypeSchema.optional(),
  in: RoleTypeSchema.array().optional(),
  notIn: RoleTypeSchema.array().optional(),
  not: z.union([RoleTypeSchema, z.lazy(() => NestedEnumRoleTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumRoleTypeFilterObjectSchema: z.ZodType<Prisma.EnumRoleTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRoleTypeFilter>;
export const EnumRoleTypeFilterObjectZodSchema = makeSchema();
