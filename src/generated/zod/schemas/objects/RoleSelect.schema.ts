import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldFindManySchema as FormFieldFindManySchema } from '../findManyFormField.schema';
import { RoleCountOutputTypeArgsObjectSchema as RoleCountOutputTypeArgsObjectSchema } from './RoleCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  isActive: z.boolean().optional(),
  fields: z.union([z.boolean(), z.lazy(() => FormFieldFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => RoleCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RoleSelectObjectSchema: z.ZodType<Prisma.RoleSelect> = makeSchema() as unknown as z.ZodType<Prisma.RoleSelect>;
export const RoleSelectObjectZodSchema = makeSchema();
