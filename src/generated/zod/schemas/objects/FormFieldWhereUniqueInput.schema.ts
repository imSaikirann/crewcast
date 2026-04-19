import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional()
}).strict();
export const FormFieldWhereUniqueInputObjectSchema: z.ZodType<Prisma.FormFieldWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldWhereUniqueInput>;
export const FormFieldWhereUniqueInputObjectZodSchema = makeSchema();
