import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldCreateWithoutRoleInputObjectSchema as FormFieldCreateWithoutRoleInputObjectSchema } from './FormFieldCreateWithoutRoleInput.schema';
import { FormFieldUncheckedCreateWithoutRoleInputObjectSchema as FormFieldUncheckedCreateWithoutRoleInputObjectSchema } from './FormFieldUncheckedCreateWithoutRoleInput.schema';
import { FormFieldCreateOrConnectWithoutRoleInputObjectSchema as FormFieldCreateOrConnectWithoutRoleInputObjectSchema } from './FormFieldCreateOrConnectWithoutRoleInput.schema';
import { FormFieldUpsertWithWhereUniqueWithoutRoleInputObjectSchema as FormFieldUpsertWithWhereUniqueWithoutRoleInputObjectSchema } from './FormFieldUpsertWithWhereUniqueWithoutRoleInput.schema';
import { FormFieldCreateManyRoleInputEnvelopeObjectSchema as FormFieldCreateManyRoleInputEnvelopeObjectSchema } from './FormFieldCreateManyRoleInputEnvelope.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './FormFieldWhereUniqueInput.schema';
import { FormFieldUpdateWithWhereUniqueWithoutRoleInputObjectSchema as FormFieldUpdateWithWhereUniqueWithoutRoleInputObjectSchema } from './FormFieldUpdateWithWhereUniqueWithoutRoleInput.schema';
import { FormFieldUpdateManyWithWhereWithoutRoleInputObjectSchema as FormFieldUpdateManyWithWhereWithoutRoleInputObjectSchema } from './FormFieldUpdateManyWithWhereWithoutRoleInput.schema';
import { FormFieldScalarWhereInputObjectSchema as FormFieldScalarWhereInputObjectSchema } from './FormFieldScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FormFieldCreateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => FormFieldUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FormFieldCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => FormFieldCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FormFieldUpsertWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUpsertWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FormFieldCreateManyRoleInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FormFieldWhereUniqueInputObjectSchema), z.lazy(() => FormFieldWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FormFieldWhereUniqueInputObjectSchema), z.lazy(() => FormFieldWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FormFieldWhereUniqueInputObjectSchema), z.lazy(() => FormFieldWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FormFieldWhereUniqueInputObjectSchema), z.lazy(() => FormFieldWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FormFieldUpdateWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUpdateWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FormFieldUpdateManyWithWhereWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUpdateManyWithWhereWithoutRoleInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FormFieldScalarWhereInputObjectSchema), z.lazy(() => FormFieldScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FormFieldUpdateManyWithoutRoleNestedInputObjectSchema: z.ZodType<Prisma.FormFieldUpdateManyWithoutRoleNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldUpdateManyWithoutRoleNestedInput>;
export const FormFieldUpdateManyWithoutRoleNestedInputObjectZodSchema = makeSchema();
