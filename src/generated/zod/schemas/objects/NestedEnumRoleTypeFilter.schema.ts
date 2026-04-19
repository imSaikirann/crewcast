import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleTypeSchema } from '../enums/RoleType.schema'

const nestedenumroletypefilterSchema = z.object({
  equals: RoleTypeSchema.optional(),
  in: RoleTypeSchema.array().optional(),
  notIn: RoleTypeSchema.array().optional(),
  not: z.union([RoleTypeSchema, z.lazy(() => NestedEnumRoleTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumRoleTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleTypeFilter> = nestedenumroletypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumRoleTypeFilter>;
export const NestedEnumRoleTypeFilterObjectZodSchema = nestedenumroletypefilterSchema;
