import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldCreateoptionsInputObjectSchema as FormFieldCreateoptionsInputObjectSchema } from './FormFieldCreateoptionsInput.schema';
import { RoleCreateNestedOneWithoutFieldsInputObjectSchema as RoleCreateNestedOneWithoutFieldsInputObjectSchema } from './RoleCreateNestedOneWithoutFieldsInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  label: z.string(),
  name: z.string(),
  type: z.string(),
  required: z.boolean().optional(),
  options: z.union([z.lazy(() => FormFieldCreateoptionsInputObjectSchema), z.string().array()]).optional(),
  createdAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutFieldsInputObjectSchema)
}).strict();
export const FormFieldCreateInputObjectSchema: z.ZodType<Prisma.FormFieldCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCreateInput>;
export const FormFieldCreateInputObjectZodSchema = makeSchema();
