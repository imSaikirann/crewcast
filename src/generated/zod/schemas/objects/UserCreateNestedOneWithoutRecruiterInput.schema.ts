import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRecruiterInputObjectSchema as UserCreateWithoutRecruiterInputObjectSchema } from './UserCreateWithoutRecruiterInput.schema';
import { UserUncheckedCreateWithoutRecruiterInputObjectSchema as UserUncheckedCreateWithoutRecruiterInputObjectSchema } from './UserUncheckedCreateWithoutRecruiterInput.schema';
import { UserCreateOrConnectWithoutRecruiterInputObjectSchema as UserCreateOrConnectWithoutRecruiterInputObjectSchema } from './UserCreateOrConnectWithoutRecruiterInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRecruiterInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRecruiterInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecruiterInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutRecruiterInput>;
export const UserCreateNestedOneWithoutRecruiterInputObjectZodSchema = makeSchema();
