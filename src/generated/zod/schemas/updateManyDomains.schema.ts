import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsUpdateManyMutationInputObjectSchema as DomainsUpdateManyMutationInputObjectSchema } from './objects/DomainsUpdateManyMutationInput.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './objects/DomainsWhereInput.schema';

export const DomainsUpdateManySchema: z.ZodType<Prisma.DomainsUpdateManyArgs> = z.object({ data: DomainsUpdateManyMutationInputObjectSchema, where: DomainsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DomainsUpdateManyArgs>;

export const DomainsUpdateManyZodSchema = z.object({ data: DomainsUpdateManyMutationInputObjectSchema, where: DomainsWhereInputObjectSchema.optional() }).strict();