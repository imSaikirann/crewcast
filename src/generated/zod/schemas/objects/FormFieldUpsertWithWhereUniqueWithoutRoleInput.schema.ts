import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './FormFieldWhereUniqueInput.schema';
import { FormFieldUpdateWithoutRoleInputObjectSchema as FormFieldUpdateWithoutRoleInputObjectSchema } from './FormFieldUpdateWithoutRoleInput.schema';
import { FormFieldUncheckedUpdateWithoutRoleInputObjectSchema as FormFieldUncheckedUpdateWithoutRoleInputObjectSchema } from './FormFieldUncheckedUpdateWithoutRoleInput.schema';
import { FormFieldCreateWithoutRoleInputObjectSchema as FormFieldCreateWithoutRoleInputObjectSchema } from './FormFieldCreateWithoutRoleInput.schema';
import { FormFieldUncheckedCreateWithoutRoleInputObjectSchema as FormFieldUncheckedCreateWithoutRoleInputObjectSchema } from './FormFieldUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormFieldWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FormFieldUpdateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUncheckedUpdateWithoutRoleInputObjectSchema)]),
  create: z.union([z.lazy(() => FormFieldCreateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const FormFieldUpsertWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.FormFieldUpsertWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldUpsertWithWhereUniqueWithoutRoleInput>;
export const FormFieldUpsertWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
