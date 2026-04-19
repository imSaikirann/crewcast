import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const RecruiterFormCreatetechStackInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreatetechStackInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreatetechStackInput>;
export const RecruiterFormCreatetechStackInputObjectZodSchema = makeSchema();
