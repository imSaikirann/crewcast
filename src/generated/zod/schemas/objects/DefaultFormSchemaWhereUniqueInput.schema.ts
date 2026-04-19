import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  domainId: z.string().max(24).optional()
}).strict();
export const DefaultFormSchemaWhereUniqueInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaWhereUniqueInput>;
export const DefaultFormSchemaWhereUniqueInputObjectZodSchema = makeSchema();
