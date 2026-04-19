import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './FormFieldWhereUniqueInput.schema';
import { FormFieldUpdateWithoutRoleInputObjectSchema as FormFieldUpdateWithoutRoleInputObjectSchema } from './FormFieldUpdateWithoutRoleInput.schema';
import { FormFieldUncheckedUpdateWithoutRoleInputObjectSchema as FormFieldUncheckedUpdateWithoutRoleInputObjectSchema } from './FormFieldUncheckedUpdateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormFieldWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FormFieldUpdateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUncheckedUpdateWithoutRoleInputObjectSchema)])
}).strict();
export const FormFieldUpdateWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.FormFieldUpdateWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldUpdateWithWhereUniqueWithoutRoleInput>;
export const FormFieldUpdateWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
