import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewCreateWithoutFormInputObjectSchema as FormViewCreateWithoutFormInputObjectSchema } from './FormViewCreateWithoutFormInput.schema';
import { FormViewUncheckedCreateWithoutFormInputObjectSchema as FormViewUncheckedCreateWithoutFormInputObjectSchema } from './FormViewUncheckedCreateWithoutFormInput.schema';
import { FormViewCreateOrConnectWithoutFormInputObjectSchema as FormViewCreateOrConnectWithoutFormInputObjectSchema } from './FormViewCreateOrConnectWithoutFormInput.schema';
import { FormViewUpsertWithWhereUniqueWithoutFormInputObjectSchema as FormViewUpsertWithWhereUniqueWithoutFormInputObjectSchema } from './FormViewUpsertWithWhereUniqueWithoutFormInput.schema';
import { FormViewCreateManyFormInputEnvelopeObjectSchema as FormViewCreateManyFormInputEnvelopeObjectSchema } from './FormViewCreateManyFormInputEnvelope.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './FormViewWhereUniqueInput.schema';
import { FormViewUpdateWithWhereUniqueWithoutFormInputObjectSchema as FormViewUpdateWithWhereUniqueWithoutFormInputObjectSchema } from './FormViewUpdateWithWhereUniqueWithoutFormInput.schema';
import { FormViewUpdateManyWithWhereWithoutFormInputObjectSchema as FormViewUpdateManyWithWhereWithoutFormInputObjectSchema } from './FormViewUpdateManyWithWhereWithoutFormInput.schema';
import { FormViewScalarWhereInputObjectSchema as FormViewScalarWhereInputObjectSchema } from './FormViewScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FormViewCreateWithoutFormInputObjectSchema), z.lazy(() => FormViewCreateWithoutFormInputObjectSchema).array(), z.lazy(() => FormViewUncheckedCreateWithoutFormInputObjectSchema), z.lazy(() => FormViewUncheckedCreateWithoutFormInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FormViewCreateOrConnectWithoutFormInputObjectSchema), z.lazy(() => FormViewCreateOrConnectWithoutFormInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FormViewUpsertWithWhereUniqueWithoutFormInputObjectSchema), z.lazy(() => FormViewUpsertWithWhereUniqueWithoutFormInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FormViewCreateManyFormInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FormViewWhereUniqueInputObjectSchema), z.lazy(() => FormViewWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FormViewWhereUniqueInputObjectSchema), z.lazy(() => FormViewWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FormViewWhereUniqueInputObjectSchema), z.lazy(() => FormViewWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FormViewWhereUniqueInputObjectSchema), z.lazy(() => FormViewWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FormViewUpdateWithWhereUniqueWithoutFormInputObjectSchema), z.lazy(() => FormViewUpdateWithWhereUniqueWithoutFormInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FormViewUpdateManyWithWhereWithoutFormInputObjectSchema), z.lazy(() => FormViewUpdateManyWithWhereWithoutFormInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FormViewScalarWhereInputObjectSchema), z.lazy(() => FormViewScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FormViewUncheckedUpdateManyWithoutFormNestedInputObjectSchema: z.ZodType<Prisma.FormViewUncheckedUpdateManyWithoutFormNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewUncheckedUpdateManyWithoutFormNestedInput>;
export const FormViewUncheckedUpdateManyWithoutFormNestedInputObjectZodSchema = makeSchema();
