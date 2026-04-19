import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldUncheckedCreateNestedManyWithoutRoleInputObjectSchema as FormFieldUncheckedCreateNestedManyWithoutRoleInputObjectSchema } from './FormFieldUncheckedCreateNestedManyWithoutRoleInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  fields: z.lazy(() => FormFieldUncheckedCreateNestedManyWithoutRoleInputObjectSchema).optional()
}).strict();
export const RoleUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleUncheckedCreateInput>;
export const RoleUncheckedCreateInputObjectZodSchema = makeSchema();
