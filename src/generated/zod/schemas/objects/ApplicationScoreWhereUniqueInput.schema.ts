import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional()
}).strict();
export const ApplicationScoreWhereUniqueInputObjectSchema: z.ZodType<Prisma.ApplicationScoreWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreWhereUniqueInput>;
export const ApplicationScoreWhereUniqueInputObjectZodSchema = makeSchema();
