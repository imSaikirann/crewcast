import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldCreateWithoutRoleInputObjectSchema as FormFieldCreateWithoutRoleInputObjectSchema } from './FormFieldCreateWithoutRoleInput.schema';
import { FormFieldUncheckedCreateWithoutRoleInputObjectSchema as FormFieldUncheckedCreateWithoutRoleInputObjectSchema } from './FormFieldUncheckedCreateWithoutRoleInput.schema';
import { FormFieldCreateOrConnectWithoutRoleInputObjectSchema as FormFieldCreateOrConnectWithoutRoleInputObjectSchema } from './FormFieldCreateOrConnectWithoutRoleInput.schema';
import { FormFieldCreateManyRoleInputEnvelopeObjectSchema as FormFieldCreateManyRoleInputEnvelopeObjectSchema } from './FormFieldCreateManyRoleInputEnvelope.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './FormFieldWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FormFieldCreateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => FormFieldUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FormFieldCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => FormFieldCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FormFieldCreateManyRoleInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FormFieldWhereUniqueInputObjectSchema), z.lazy(() => FormFieldWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FormFieldUncheckedCreateNestedManyWithoutRoleInputObjectSchema: z.ZodType<Prisma.FormFieldUncheckedCreateNestedManyWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldUncheckedCreateNestedManyWithoutRoleInput>;
export const FormFieldUncheckedCreateNestedManyWithoutRoleInputObjectZodSchema = makeSchema();
