import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RoleOrderByWithRelationInputObjectSchema as RoleOrderByWithRelationInputObjectSchema } from './RoleOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  roleId: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  required: SortOrderSchema.optional(),
  options: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const FormFieldOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.FormFieldOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldOrderByWithRelationInput>;
export const FormFieldOrderByWithRelationInputObjectZodSchema = makeSchema();
