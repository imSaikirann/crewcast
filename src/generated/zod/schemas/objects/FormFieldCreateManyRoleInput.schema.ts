import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldCreateoptionsInputObjectSchema as FormFieldCreateoptionsInputObjectSchema } from './FormFieldCreateoptionsInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  label: z.string(),
  name: z.string(),
  type: z.string(),
  required: z.boolean().optional(),
  options: z.union([z.lazy(() => FormFieldCreateoptionsInputObjectSchema), z.string().array()]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const FormFieldCreateManyRoleInputObjectSchema: z.ZodType<Prisma.FormFieldCreateManyRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCreateManyRoleInput>;
export const FormFieldCreateManyRoleInputObjectZodSchema = makeSchema();
