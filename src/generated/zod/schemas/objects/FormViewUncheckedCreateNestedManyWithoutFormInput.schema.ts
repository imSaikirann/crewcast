import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewCreateWithoutFormInputObjectSchema as FormViewCreateWithoutFormInputObjectSchema } from './FormViewCreateWithoutFormInput.schema';
import { FormViewUncheckedCreateWithoutFormInputObjectSchema as FormViewUncheckedCreateWithoutFormInputObjectSchema } from './FormViewUncheckedCreateWithoutFormInput.schema';
import { FormViewCreateOrConnectWithoutFormInputObjectSchema as FormViewCreateOrConnectWithoutFormInputObjectSchema } from './FormViewCreateOrConnectWithoutFormInput.schema';
import { FormViewCreateManyFormInputEnvelopeObjectSchema as FormViewCreateManyFormInputEnvelopeObjectSchema } from './FormViewCreateManyFormInputEnvelope.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './FormViewWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FormViewCreateWithoutFormInputObjectSchema), z.lazy(() => FormViewCreateWithoutFormInputObjectSchema).array(), z.lazy(() => FormViewUncheckedCreateWithoutFormInputObjectSchema), z.lazy(() => FormViewUncheckedCreateWithoutFormInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FormViewCreateOrConnectWithoutFormInputObjectSchema), z.lazy(() => FormViewCreateOrConnectWithoutFormInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FormViewCreateManyFormInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FormViewWhereUniqueInputObjectSchema), z.lazy(() => FormViewWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FormViewUncheckedCreateNestedManyWithoutFormInputObjectSchema: z.ZodType<Prisma.FormViewUncheckedCreateNestedManyWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewUncheckedCreateNestedManyWithoutFormInput>;
export const FormViewUncheckedCreateNestedManyWithoutFormInputObjectZodSchema = makeSchema();
