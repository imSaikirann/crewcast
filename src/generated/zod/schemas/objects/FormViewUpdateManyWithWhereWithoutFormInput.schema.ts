import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewScalarWhereInputObjectSchema as FormViewScalarWhereInputObjectSchema } from './FormViewScalarWhereInput.schema';
import { FormViewUpdateManyMutationInputObjectSchema as FormViewUpdateManyMutationInputObjectSchema } from './FormViewUpdateManyMutationInput.schema';
import { FormViewUncheckedUpdateManyWithoutFormInputObjectSchema as FormViewUncheckedUpdateManyWithoutFormInputObjectSchema } from './FormViewUncheckedUpdateManyWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormViewScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FormViewUpdateManyMutationInputObjectSchema), z.lazy(() => FormViewUncheckedUpdateManyWithoutFormInputObjectSchema)])
}).strict();
export const FormViewUpdateManyWithWhereWithoutFormInputObjectSchema: z.ZodType<Prisma.FormViewUpdateManyWithWhereWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewUpdateManyWithWhereWithoutFormInput>;
export const FormViewUpdateManyWithWhereWithoutFormInputObjectZodSchema = makeSchema();
