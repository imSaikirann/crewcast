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
export const FormFieldCreateWithoutRoleInputObjectSchema: z.ZodType<Prisma.FormFieldCreateWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCreateWithoutRoleInput>;
export const FormFieldCreateWithoutRoleInputObjectZodSchema = makeSchema();
