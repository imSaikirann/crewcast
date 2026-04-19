import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCreateWithoutUserInputObjectSchema as RecruiterCreateWithoutUserInputObjectSchema } from './RecruiterCreateWithoutUserInput.schema';
import { RecruiterUncheckedCreateWithoutUserInputObjectSchema as RecruiterUncheckedCreateWithoutUserInputObjectSchema } from './RecruiterUncheckedCreateWithoutUserInput.schema';
import { RecruiterCreateOrConnectWithoutUserInputObjectSchema as RecruiterCreateOrConnectWithoutUserInputObjectSchema } from './RecruiterCreateOrConnectWithoutUserInput.schema';
import { RecruiterUpsertWithoutUserInputObjectSchema as RecruiterUpsertWithoutUserInputObjectSchema } from './RecruiterUpsertWithoutUserInput.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema';
import { RecruiterUpdateToOneWithWhereWithoutUserInputObjectSchema as RecruiterUpdateToOneWithWhereWithoutUserInputObjectSchema } from './RecruiterUpdateToOneWithWhereWithoutUserInput.schema';
import { RecruiterUpdateWithoutUserInputObjectSchema as RecruiterUpdateWithoutUserInputObjectSchema } from './RecruiterUpdateWithoutUserInput.schema';
import { RecruiterUncheckedUpdateWithoutUserInputObjectSchema as RecruiterUncheckedUpdateWithoutUserInputObjectSchema } from './RecruiterUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterCreateWithoutUserInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterCreateOrConnectWithoutUserInputObjectSchema).optional(),
  upsert: z.lazy(() => RecruiterUpsertWithoutUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => RecruiterWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => RecruiterWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => RecruiterWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RecruiterUpdateToOneWithWhereWithoutUserInputObjectSchema), z.lazy(() => RecruiterUpdateWithoutUserInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutUserInputObjectSchema)]).optional()
}).strict();
export const RecruiterUncheckedUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.RecruiterUncheckedUpdateOneWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUncheckedUpdateOneWithoutUserNestedInput>;
export const RecruiterUncheckedUpdateOneWithoutUserNestedInputObjectZodSchema = makeSchema();
