import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './FormFieldWhereUniqueInput.schema';
import { FormFieldCreateWithoutRoleInputObjectSchema as FormFieldCreateWithoutRoleInputObjectSchema } from './FormFieldCreateWithoutRoleInput.schema';
import { FormFieldUncheckedCreateWithoutRoleInputObjectSchema as FormFieldUncheckedCreateWithoutRoleInputObjectSchema } from './FormFieldUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormFieldWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FormFieldCreateWithoutRoleInputObjectSchema), z.lazy(() => FormFieldUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const FormFieldCreateOrConnectWithoutRoleInputObjectSchema: z.ZodType<Prisma.FormFieldCreateOrConnectWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCreateOrConnectWithoutRoleInput>;
export const FormFieldCreateOrConnectWithoutRoleInputObjectZodSchema = makeSchema();
