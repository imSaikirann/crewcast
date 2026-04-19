import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  userId: z.string().max(24).optional()
}).strict();
export const RecruiterWhereUniqueInputObjectSchema: z.ZodType<Prisma.RecruiterWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterWhereUniqueInput>;
export const RecruiterWhereUniqueInputObjectZodSchema = makeSchema();
