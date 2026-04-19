import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleWhereUniqueInputObjectSchema as RoleWhereUniqueInputObjectSchema } from './RoleWhereUniqueInput.schema';
import { RoleCreateWithoutFieldsInputObjectSchema as RoleCreateWithoutFieldsInputObjectSchema } from './RoleCreateWithoutFieldsInput.schema';
import { RoleUncheckedCreateWithoutFieldsInputObjectSchema as RoleUncheckedCreateWithoutFieldsInputObjectSchema } from './RoleUncheckedCreateWithoutFieldsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RoleWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RoleCreateWithoutFieldsInputObjectSchema), z.lazy(() => RoleUncheckedCreateWithoutFieldsInputObjectSchema)])
}).strict();
export const RoleCreateOrConnectWithoutFieldsInputObjectSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutFieldsInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleCreateOrConnectWithoutFieldsInput>;
export const RoleCreateOrConnectWithoutFieldsInputObjectZodSchema = makeSchema();
