import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormArgsObjectSchema as RecruiterFormArgsObjectSchema } from './RecruiterFormArgs.schema'

const makeSchema = () => z.object({
  form: z.union([z.boolean(), z.lazy(() => RecruiterFormArgsObjectSchema)]).optional()
}).strict();
export const FormViewIncludeObjectSchema: z.ZodType<Prisma.FormViewInclude> = makeSchema() as unknown as z.ZodType<Prisma.FormViewInclude>;
export const FormViewIncludeObjectZodSchema = makeSchema();
