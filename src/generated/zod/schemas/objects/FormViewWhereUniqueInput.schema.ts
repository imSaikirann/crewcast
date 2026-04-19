import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional()
}).strict();
export const FormViewWhereUniqueInputObjectSchema: z.ZodType<Prisma.FormViewWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewWhereUniqueInput>;
export const FormViewWhereUniqueInputObjectZodSchema = makeSchema();
