import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './FormViewWhereUniqueInput.schema';
import { FormViewUpdateWithoutFormInputObjectSchema as FormViewUpdateWithoutFormInputObjectSchema } from './FormViewUpdateWithoutFormInput.schema';
import { FormViewUncheckedUpdateWithoutFormInputObjectSchema as FormViewUncheckedUpdateWithoutFormInputObjectSchema } from './FormViewUncheckedUpdateWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormViewWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FormViewUpdateWithoutFormInputObjectSchema), z.lazy(() => FormViewUncheckedUpdateWithoutFormInputObjectSchema)])
}).strict();
export const FormViewUpdateWithWhereUniqueWithoutFormInputObjectSchema: z.ZodType<Prisma.FormViewUpdateWithWhereUniqueWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewUpdateWithWhereUniqueWithoutFormInput>;
export const FormViewUpdateWithWhereUniqueWithoutFormInputObjectZodSchema = makeSchema();
