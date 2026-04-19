import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutRecruiterInputObjectSchema as UserUpdateWithoutRecruiterInputObjectSchema } from './UserUpdateWithoutRecruiterInput.schema';
import { UserUncheckedUpdateWithoutRecruiterInputObjectSchema as UserUncheckedUpdateWithoutRecruiterInputObjectSchema } from './UserUncheckedUpdateWithoutRecruiterInput.schema';
import { UserCreateWithoutRecruiterInputObjectSchema as UserCreateWithoutRecruiterInputObjectSchema } from './UserCreateWithoutRecruiterInput.schema';
import { UserUncheckedCreateWithoutRecruiterInputObjectSchema as UserUncheckedCreateWithoutRecruiterInputObjectSchema } from './UserUncheckedCreateWithoutRecruiterInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutRecruiterInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRecruiterInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutRecruiterInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRecruiterInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutRecruiterInput>;
export const UserUpsertWithoutRecruiterInputObjectZodSchema = makeSchema();
