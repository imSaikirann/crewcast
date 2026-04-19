import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldScalarWhereInputObjectSchema as FormFieldScalarWhereInputObjectSchema } from './FormFieldScalarWhereInput.schema';
import { FormFieldUpdateManyMutationInputObjectSchema as FormFieldUpdateManyMutationInputObjectSchema } from './FormFieldUpdateManyMutationInput.schema';
import { FormFieldUncheckedUpdateManyWithoutRoleInputObjectSchema as FormFieldUncheckedUpdateManyWithoutRoleInputObjectSchema } from './FormFieldUncheckedUpdateManyWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormFieldScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FormFieldUpdateManyMutationInputObjectSchema), z.lazy(() => FormFieldUncheckedUpdateManyWithoutRoleInputObjectSchema)])
}).strict();
export const FormFieldUpdateManyWithWhereWithoutRoleInputObjectSchema: z.ZodType<Prisma.FormFieldUpdateManyWithWhereWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldUpdateManyWithWhereWithoutRoleInput>;
export const FormFieldUpdateManyWithWhereWithoutRoleInputObjectZodSchema = makeSchema();
