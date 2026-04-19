import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldFindManySchema as FormFieldFindManySchema } from '../findManyFormField.schema';
import { RoleCountOutputTypeArgsObjectSchema as RoleCountOutputTypeArgsObjectSchema } from './RoleCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  fields: z.union([z.boolean(), z.lazy(() => FormFieldFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RoleCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RoleIncludeObjectSchema: z.ZodType<Prisma.RoleInclude> = makeSchema() as unknown as z.ZodType<Prisma.RoleInclude>;
export const RoleIncludeObjectZodSchema = makeSchema();
