import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldWhereInputObjectSchema as FormFieldWhereInputObjectSchema } from './FormFieldWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormFieldWhereInputObjectSchema).optional()
}).strict();
export const RoleCountOutputTypeCountFieldsArgsObjectSchema = makeSchema();
export const RoleCountOutputTypeCountFieldsArgsObjectZodSchema = makeSchema();
