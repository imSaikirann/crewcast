import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateWithoutRecruiterInputObjectSchema as RecruiterFormUpdateWithoutRecruiterInputObjectSchema } from './RecruiterFormUpdateWithoutRecruiterInput.schema';
import { RecruiterFormUncheckedUpdateWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedUpdateWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutRecruiterInput.schema';
import { RecruiterFormCreateWithoutRecruiterInputObjectSchema as RecruiterFormCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormCreateWithoutRecruiterInput.schema';
import { RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RecruiterFormUpdateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutRecruiterInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema)])
}).strict();
export const RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInput>;
export const RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInputObjectZodSchema = makeSchema();
