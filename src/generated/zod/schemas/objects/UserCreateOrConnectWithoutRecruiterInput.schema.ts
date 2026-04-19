import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRecruiterInputObjectSchema as UserCreateWithoutRecruiterInputObjectSchema } from './UserCreateWithoutRecruiterInput.schema';
import { UserUncheckedCreateWithoutRecruiterInputObjectSchema as UserUncheckedCreateWithoutRecruiterInputObjectSchema } from './UserUncheckedCreateWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutRecruiterInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRecruiterInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutRecruiterInput>;
export const UserCreateOrConnectWithoutRecruiterInputObjectZodSchema = makeSchema();
