import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRecruiterInputObjectSchema as UserCreateWithoutRecruiterInputObjectSchema } from './UserCreateWithoutRecruiterInput.schema';
import { UserUncheckedCreateWithoutRecruiterInputObjectSchema as UserUncheckedCreateWithoutRecruiterInputObjectSchema } from './UserUncheckedCreateWithoutRecruiterInput.schema';
import { UserCreateOrConnectWithoutRecruiterInputObjectSchema as UserCreateOrConnectWithoutRecruiterInputObjectSchema } from './UserCreateOrConnectWithoutRecruiterInput.schema';
import { UserUpsertWithoutRecruiterInputObjectSchema as UserUpsertWithoutRecruiterInputObjectSchema } from './UserUpsertWithoutRecruiterInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutRecruiterInputObjectSchema as UserUpdateToOneWithWhereWithoutRecruiterInputObjectSchema } from './UserUpdateToOneWithWhereWithoutRecruiterInput.schema';
import { UserUpdateWithoutRecruiterInputObjectSchema as UserUpdateWithoutRecruiterInputObjectSchema } from './UserUpdateWithoutRecruiterInput.schema';
import { UserUncheckedUpdateWithoutRecruiterInputObjectSchema as UserUncheckedUpdateWithoutRecruiterInputObjectSchema } from './UserUncheckedUpdateWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRecruiterInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRecruiterInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecruiterInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRecruiterInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutRecruiterInputObjectSchema), z.lazy(() => UserUpdateWithoutRecruiterInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRecruiterInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutRecruiterNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRecruiterNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutRecruiterNestedInput>;
export const UserUpdateOneRequiredWithoutRecruiterNestedInputObjectZodSchema = makeSchema();
