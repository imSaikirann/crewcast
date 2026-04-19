import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsSelectObjectSchema as DomainsSelectObjectSchema } from './objects/DomainsSelect.schema';
import { DomainsIncludeObjectSchema as DomainsIncludeObjectSchema } from './objects/DomainsInclude.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './objects/DomainsWhereUniqueInput.schema';
import { DomainsCreateInputObjectSchema as DomainsCreateInputObjectSchema } from './objects/DomainsCreateInput.schema';
import { DomainsUncheckedCreateInputObjectSchema as DomainsUncheckedCreateInputObjectSchema } from './objects/DomainsUncheckedCreateInput.schema';
import { DomainsUpdateInputObjectSchema as DomainsUpdateInputObjectSchema } from './objects/DomainsUpdateInput.schema';
import { DomainsUncheckedUpdateInputObjectSchema as DomainsUncheckedUpdateInputObjectSchema } from './objects/DomainsUncheckedUpdateInput.schema';

export const DomainsUpsertOneSchema: z.ZodType<Prisma.DomainsUpsertArgs> = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), where: DomainsWhereUniqueInputObjectSchema, create: z.union([ DomainsCreateInputObjectSchema, DomainsUncheckedCreateInputObjectSchema ]), update: z.union([ DomainsUpdateInputObjectSchema, DomainsUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.DomainsUpsertArgs>;

export const DomainsUpsertOneZodSchema = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), where: DomainsWhereUniqueInputObjectSchema, create: z.union([ DomainsCreateInputObjectSchema, DomainsUncheckedCreateInputObjectSchema ]), update: z.union([ DomainsUpdateInputObjectSchema, DomainsUncheckedUpdateInputObjectSchema ]) }).strict();