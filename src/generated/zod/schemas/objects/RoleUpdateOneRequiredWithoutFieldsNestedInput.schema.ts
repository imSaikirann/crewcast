import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleCreateWithoutFieldsInputObjectSchema as RoleCreateWithoutFieldsInputObjectSchema } from './RoleCreateWithoutFieldsInput.schema';
import { RoleUncheckedCreateWithoutFieldsInputObjectSchema as RoleUncheckedCreateWithoutFieldsInputObjectSchema } from './RoleUncheckedCreateWithoutFieldsInput.schema';
import { RoleCreateOrConnectWithoutFieldsInputObjectSchema as RoleCreateOrConnectWithoutFieldsInputObjectSchema } from './RoleCreateOrConnectWithoutFieldsInput.schema';
import { RoleUpsertWithoutFieldsInputObjectSchema as RoleUpsertWithoutFieldsInputObjectSchema } from './RoleUpsertWithoutFieldsInput.schema';
import { RoleWhereUniqueInputObjectSchema as RoleWhereUniqueInputObjectSchema } from './RoleWhereUniqueInput.schema';
import { RoleUpdateToOneWithWhereWithoutFieldsInputObjectSchema as RoleUpdateToOneWithWhereWithoutFieldsInputObjectSchema } from './RoleUpdateToOneWithWhereWithoutFieldsInput.schema';
import { RoleUpdateWithoutFieldsInputObjectSchema as RoleUpdateWithoutFieldsInputObjectSchema } from './RoleUpdateWithoutFieldsInput.schema';
import { RoleUncheckedUpdateWithoutFieldsInputObjectSchema as RoleUncheckedUpdateWithoutFieldsInputObjectSchema } from './RoleUncheckedUpdateWithoutFieldsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RoleCreateWithoutFieldsInputObjectSchema), z.lazy(() => RoleUncheckedCreateWithoutFieldsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutFieldsInputObjectSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutFieldsInputObjectSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RoleUpdateToOneWithWhereWithoutFieldsInputObjectSchema), z.lazy(() => RoleUpdateWithoutFieldsInputObjectSchema), z.lazy(() => RoleUncheckedUpdateWithoutFieldsInputObjectSchema)]).optional()
}).strict();
export const RoleUpdateOneRequiredWithoutFieldsNestedInputObjectSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutFieldsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleUpdateOneRequiredWithoutFieldsNestedInput>;
export const RoleUpdateOneRequiredWithoutFieldsNestedInputObjectZodSchema = makeSchema();
