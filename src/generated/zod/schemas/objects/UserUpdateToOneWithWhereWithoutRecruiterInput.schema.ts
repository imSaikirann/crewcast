import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutRecruiterInputObjectSchema as UserUpdateWithoutRecruiterInputObjectSchema } from './UserUpdateWithoutRecruiterInput.schema';
import { UserUncheckedUpdateWithoutRecruiterInputObjectSchema as UserUncheckedUpdateWithoutRecruiterInputObjectSchema } from './UserUncheckedUpdateWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutRecruiterInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRecruiterInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRecruiterInput>;
export const UserUpdateToOneWithWhereWithoutRecruiterInputObjectZodSchema = makeSchema();
