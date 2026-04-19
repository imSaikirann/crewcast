import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  title: z.string().optional()
}).strict();
export const DomainsWhereUniqueInputObjectSchema: z.ZodType<Prisma.DomainsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsWhereUniqueInput>;
export const DomainsWhereUniqueInputObjectZodSchema = makeSchema();
