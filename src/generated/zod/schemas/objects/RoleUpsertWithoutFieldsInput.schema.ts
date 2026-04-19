import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleUpdateWithoutFieldsInputObjectSchema as RoleUpdateWithoutFieldsInputObjectSchema } from './RoleUpdateWithoutFieldsInput.schema';
import { RoleUncheckedUpdateWithoutFieldsInputObjectSchema as RoleUncheckedUpdateWithoutFieldsInputObjectSchema } from './RoleUncheckedUpdateWithoutFieldsInput.schema';
import { RoleCreateWithoutFieldsInputObjectSchema as RoleCreateWithoutFieldsInputObjectSchema } from './RoleCreateWithoutFieldsInput.schema';
import { RoleUncheckedCreateWithoutFieldsInputObjectSchema as RoleUncheckedCreateWithoutFieldsInputObjectSchema } from './RoleUncheckedCreateWithoutFieldsInput.schema';
import { RoleWhereInputObjectSchema as RoleWhereInputObjectSchema } from './RoleWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RoleUpdateWithoutFieldsInputObjectSchema), z.lazy(() => RoleUncheckedUpdateWithoutFieldsInputObjectSchema)]),
  create: z.union([z.lazy(() => RoleCreateWithoutFieldsInputObjectSchema), z.lazy(() => RoleUncheckedCreateWithoutFieldsInputObjectSchema)]),
  where: z.lazy(() => RoleWhereInputObjectSchema).optional()
}).strict();
export const RoleUpsertWithoutFieldsInputObjectSchema: z.ZodType<Prisma.RoleUpsertWithoutFieldsInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleUpsertWithoutFieldsInput>;
export const RoleUpsertWithoutFieldsInputObjectZodSchema = makeSchema();
