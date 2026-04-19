import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleCreateWithoutFieldsInputObjectSchema as RoleCreateWithoutFieldsInputObjectSchema } from './RoleCreateWithoutFieldsInput.schema';
import { RoleUncheckedCreateWithoutFieldsInputObjectSchema as RoleUncheckedCreateWithoutFieldsInputObjectSchema } from './RoleUncheckedCreateWithoutFieldsInput.schema';
import { RoleCreateOrConnectWithoutFieldsInputObjectSchema as RoleCreateOrConnectWithoutFieldsInputObjectSchema } from './RoleCreateOrConnectWithoutFieldsInput.schema';
import { RoleWhereUniqueInputObjectSchema as RoleWhereUniqueInputObjectSchema } from './RoleWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RoleCreateWithoutFieldsInputObjectSchema), z.lazy(() => RoleUncheckedCreateWithoutFieldsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutFieldsInputObjectSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputObjectSchema).optional()
}).strict();
export const RoleCreateNestedOneWithoutFieldsInputObjectSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutFieldsInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleCreateNestedOneWithoutFieldsInput>;
export const RoleCreateNestedOneWithoutFieldsInputObjectZodSchema = makeSchema();
