import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCreateWithoutUserInputObjectSchema as RecruiterCreateWithoutUserInputObjectSchema } from './RecruiterCreateWithoutUserInput.schema';
import { RecruiterUncheckedCreateWithoutUserInputObjectSchema as RecruiterUncheckedCreateWithoutUserInputObjectSchema } from './RecruiterUncheckedCreateWithoutUserInput.schema';
import { RecruiterCreateOrConnectWithoutUserInputObjectSchema as RecruiterCreateOrConnectWithoutUserInputObjectSchema } from './RecruiterCreateOrConnectWithoutUserInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterCreateWithoutUserInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterCreateOrConnectWithoutUserInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterWhereUniqueInputObjectSchema).optional()
}).strict();
export const RecruiterUncheckedCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<Prisma.RecruiterUncheckedCreateNestedOneWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUncheckedCreateNestedOneWithoutUserInput>;
export const RecruiterUncheckedCreateNestedOneWithoutUserInputObjectZodSchema = makeSchema();
