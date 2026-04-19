import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema';
import { RecruiterCreateWithoutUserInputObjectSchema as RecruiterCreateWithoutUserInputObjectSchema } from './RecruiterCreateWithoutUserInput.schema';
import { RecruiterUncheckedCreateWithoutUserInputObjectSchema as RecruiterUncheckedCreateWithoutUserInputObjectSchema } from './RecruiterUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterCreateWithoutUserInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const RecruiterCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.RecruiterCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateOrConnectWithoutUserInput>;
export const RecruiterCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
