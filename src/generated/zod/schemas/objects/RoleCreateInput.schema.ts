import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldCreateNestedManyWithoutRoleInputObjectSchema as FormFieldCreateNestedManyWithoutRoleInputObjectSchema } from './FormFieldCreateNestedManyWithoutRoleInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  fields: z.lazy(() => FormFieldCreateNestedManyWithoutRoleInputObjectSchema).optional()
}).strict();
export const RoleCreateInputObjectSchema: z.ZodType<Prisma.RoleCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleCreateInput>;
export const RoleCreateInputObjectZodSchema = makeSchema();
