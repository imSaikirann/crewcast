import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  title: z.string(),
  description: z.string(),
  jobCount: z.number().int().optional(),
  haveDefaultForm: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DomainsCreateManyInputObjectSchema: z.ZodType<Prisma.DomainsCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCreateManyInput>;
export const DomainsCreateManyInputObjectZodSchema = makeSchema();
