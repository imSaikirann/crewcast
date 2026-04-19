import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsSelectObjectSchema as DomainsSelectObjectSchema } from './objects/DomainsSelect.schema';
import { DomainsIncludeObjectSchema as DomainsIncludeObjectSchema } from './objects/DomainsInclude.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './objects/DomainsWhereUniqueInput.schema';

export const DomainsDeleteOneSchema: z.ZodType<Prisma.DomainsDeleteArgs> = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), where: DomainsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DomainsDeleteArgs>;

export const DomainsDeleteOneZodSchema = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), where: DomainsWhereUniqueInputObjectSchema }).strict();