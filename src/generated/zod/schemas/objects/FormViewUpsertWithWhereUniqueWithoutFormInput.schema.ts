import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './FormViewWhereUniqueInput.schema';
import { FormViewUpdateWithoutFormInputObjectSchema as FormViewUpdateWithoutFormInputObjectSchema } from './FormViewUpdateWithoutFormInput.schema';
import { FormViewUncheckedUpdateWithoutFormInputObjectSchema as FormViewUncheckedUpdateWithoutFormInputObjectSchema } from './FormViewUncheckedUpdateWithoutFormInput.schema';
import { FormViewCreateWithoutFormInputObjectSchema as FormViewCreateWithoutFormInputObjectSchema } from './FormViewCreateWithoutFormInput.schema';
import { FormViewUncheckedCreateWithoutFormInputObjectSchema as FormViewUncheckedCreateWithoutFormInputObjectSchema } from './FormViewUncheckedCreateWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormViewWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FormViewUpdateWithoutFormInputObjectSchema), z.lazy(() => FormViewUncheckedUpdateWithoutFormInputObjectSchema)]),
  create: z.union([z.lazy(() => FormViewCreateWithoutFormInputObjectSchema), z.lazy(() => FormViewUncheckedCreateWithoutFormInputObjectSchema)])
}).strict();
export const FormViewUpsertWithWhereUniqueWithoutFormInputObjectSchema: z.ZodType<Prisma.FormViewUpsertWithWhereUniqueWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewUpsertWithWhereUniqueWithoutFormInput>;
export const FormViewUpsertWithWhereUniqueWithoutFormInputObjectZodSchema = makeSchema();
