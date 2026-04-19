import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleTypeSchema } from '../enums/RoleType.schema'

const makeSchema = () => z.object({
  set: RoleTypeSchema.optional()
}).strict();
export const EnumRoleTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumRoleTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumRoleTypeFieldUpdateOperationsInput>;
export const EnumRoleTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
