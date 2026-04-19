import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const RoleCreateWithoutFieldsInputObjectSchema: z.ZodType<Prisma.RoleCreateWithoutFieldsInput> = makeSchema() as unknown as z.ZodType<Prisma.RoleCreateWithoutFieldsInput>;
export const RoleCreateWithoutFieldsInputObjectZodSchema = makeSchema();
