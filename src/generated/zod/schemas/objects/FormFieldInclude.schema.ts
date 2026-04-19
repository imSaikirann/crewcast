import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleArgsObjectSchema as RoleArgsObjectSchema } from './RoleArgs.schema'

const makeSchema = () => z.object({
  role: z.union([z.boolean(), z.lazy(() => RoleArgsObjectSchema)]).optional()
}).strict();
export const FormFieldIncludeObjectSchema: z.ZodType<Prisma.FormFieldInclude> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldInclude>;
export const FormFieldIncludeObjectZodSchema = makeSchema();
