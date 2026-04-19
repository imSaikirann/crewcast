import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterUpdateWithoutRecruiterFormsInputObjectSchema as RecruiterUpdateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUpdateWithoutRecruiterFormsInput.schema';
import { RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema as RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUncheckedUpdateWithoutRecruiterFormsInput.schema';
import { RecruiterCreateWithoutRecruiterFormsInputObjectSchema as RecruiterCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterCreateWithoutRecruiterFormsInput.schema';
import { RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema as RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUncheckedCreateWithoutRecruiterFormsInput.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RecruiterUpdateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema)]),
  where: z.lazy(() => RecruiterWhereInputObjectSchema).optional()
}).strict();
export const RecruiterUpsertWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.RecruiterUpsertWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpsertWithoutRecruiterFormsInput>;
export const RecruiterUpsertWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
