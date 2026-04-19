import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FormFieldOrderByRelationAggregateInputObjectSchema as FormFieldOrderByRelationAggregateInputObjectSchema } from './FormFieldOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  fields: z.lazy(() => FormFieldOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const RoleOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleOrderByWithRelationInput>;
export const RoleOrderByWithRelationInputObjectZodSchema = makeSchema();
