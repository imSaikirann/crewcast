import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsSelectObjectSchema as DomainsSelectObjectSchema } from './objects/DomainsSelect.schema';
import { DomainsIncludeObjectSchema as DomainsIncludeObjectSchema } from './objects/DomainsInclude.schema';
import { DomainsUpdateInputObjectSchema as DomainsUpdateInputObjectSchema } from './objects/DomainsUpdateInput.schema';
import { DomainsUncheckedUpdateInputObjectSchema as DomainsUncheckedUpdateInputObjectSchema } from './objects/DomainsUncheckedUpdateInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './objects/DomainsWhereUniqueInput.schema';

export const DomainsUpdateOneSchema: z.ZodType<Prisma.DomainsUpdateArgs> = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), data: z.union([DomainsUpdateInputObjectSchema, DomainsUncheckedUpdateInputObjectSchema]), where: DomainsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DomainsUpdateArgs>;

export const DomainsUpdateOneZodSchema = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), data: z.union([DomainsUpdateInputObjectSchema, DomainsUncheckedUpdateInputObjectSchema]), where: DomainsWhereUniqueInputObjectSchema }).strict();