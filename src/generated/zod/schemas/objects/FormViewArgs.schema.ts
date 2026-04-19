import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewSelectObjectSchema as FormViewSelectObjectSchema } from './FormViewSelect.schema';
import { FormViewIncludeObjectSchema as FormViewIncludeObjectSchema } from './FormViewInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FormViewSelectObjectSchema).optional(),
  include: z.lazy(() => FormViewIncludeObjectSchema).optional()
}).strict();
export const FormViewArgsObjectSchema = makeSchema();
export const FormViewArgsObjectZodSchema = makeSchema();
