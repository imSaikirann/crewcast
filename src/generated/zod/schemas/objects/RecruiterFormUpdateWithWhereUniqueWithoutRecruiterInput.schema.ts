import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateWithoutRecruiterInputObjectSchema as RecruiterFormUpdateWithoutRecruiterInputObjectSchema } from './RecruiterFormUpdateWithoutRecruiterInput.schema';
import { RecruiterFormUncheckedUpdateWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedUpdateWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RecruiterFormUpdateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutRecruiterInputObjectSchema)])
}).strict();
export const RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInput>;
export const RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInputObjectZodSchema = makeSchema();
