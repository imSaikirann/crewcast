import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './FormViewWhereUniqueInput.schema';
import { FormViewCreateWithoutFormInputObjectSchema as FormViewCreateWithoutFormInputObjectSchema } from './FormViewCreateWithoutFormInput.schema';
import { FormViewUncheckedCreateWithoutFormInputObjectSchema as FormViewUncheckedCreateWithoutFormInputObjectSchema } from './FormViewUncheckedCreateWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormViewWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FormViewCreateWithoutFormInputObjectSchema), z.lazy(() => FormViewUncheckedCreateWithoutFormInputObjectSchema)])
}).strict();
export const FormViewCreateOrConnectWithoutFormInputObjectSchema: z.ZodType<Prisma.FormViewCreateOrConnectWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewCreateOrConnectWithoutFormInput>;
export const FormViewCreateOrConnectWithoutFormInputObjectZodSchema = makeSchema();
