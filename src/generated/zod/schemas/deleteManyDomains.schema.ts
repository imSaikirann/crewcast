import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './objects/DomainsWhereInput.schema';

export const DomainsDeleteManySchema: z.ZodType<Prisma.DomainsDeleteManyArgs> = z.object({ where: DomainsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DomainsDeleteManyArgs>;

export const DomainsDeleteManyZodSchema = z.object({ where: DomainsWhereInputObjectSchema.optional() }).strict();