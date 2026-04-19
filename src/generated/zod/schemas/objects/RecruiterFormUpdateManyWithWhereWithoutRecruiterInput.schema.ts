import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormScalarWhereInputObjectSchema as RecruiterFormScalarWhereInputObjectSchema } from './RecruiterFormScalarWhereInput.schema';
import { RecruiterFormUpdateManyMutationInputObjectSchema as RecruiterFormUpdateManyMutationInputObjectSchema } from './RecruiterFormUpdateManyMutationInput.schema';
import { RecruiterFormUncheckedUpdateManyWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedUpdateManyWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedUpdateManyWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RecruiterFormUpdateManyMutationInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateManyWithoutRecruiterInputObjectSchema)])
}).strict();
export const RecruiterFormUpdateManyWithWhereWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateManyWithWhereWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateManyWithWhereWithoutRecruiterInput>;
export const RecruiterFormUpdateManyWithWhereWithoutRecruiterInputObjectZodSchema = makeSchema();
