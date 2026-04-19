import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleArgsObjectSchema as RoleArgsObjectSchema } from './RoleArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  roleId: z.boolean().optional(),
  role: z.union([z.boolean(), z.lazy(() => RoleArgsObjectSchema)]).optional(),
  label: z.boolean().optional(),
  name: z.boolean().optional(),
  type: z.boolean().optional(),
  required: z.boolean().optional(),
  options: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const FormFieldSelectObjectSchema: z.ZodType<Prisma.FormFieldSelect> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldSelect>;
export const FormFieldSelectObjectZodSchema = makeSchema();
