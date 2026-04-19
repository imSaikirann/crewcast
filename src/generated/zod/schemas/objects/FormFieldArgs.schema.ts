import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldSelectObjectSchema as FormFieldSelectObjectSchema } from './FormFieldSelect.schema';
import { FormFieldIncludeObjectSchema as FormFieldIncludeObjectSchema } from './FormFieldInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FormFieldSelectObjectSchema).optional(),
  include: z.lazy(() => FormFieldIncludeObjectSchema).optional()
}).strict();
export const FormFieldArgsObjectSchema = makeSchema();
export const FormFieldArgsObjectZodSchema = makeSchema();
