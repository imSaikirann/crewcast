import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  publicId: z.string().optional()
}).strict();
export const RecruiterFormWhereUniqueInputObjectSchema: z.ZodType<Prisma.RecruiterFormWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormWhereUniqueInput>;
export const RecruiterFormWhereUniqueInputObjectZodSchema = makeSchema();
