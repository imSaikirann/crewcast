import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsSelectObjectSchema as DomainsSelectObjectSchema } from './objects/DomainsSelect.schema';
import { DomainsIncludeObjectSchema as DomainsIncludeObjectSchema } from './objects/DomainsInclude.schema';
import { DomainsCreateInputObjectSchema as DomainsCreateInputObjectSchema } from './objects/DomainsCreateInput.schema';
import { DomainsUncheckedCreateInputObjectSchema as DomainsUncheckedCreateInputObjectSchema } from './objects/DomainsUncheckedCreateInput.schema';

export const DomainsCreateOneSchema: z.ZodType<Prisma.DomainsCreateArgs> = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), data: z.union([DomainsCreateInputObjectSchema, DomainsUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.DomainsCreateArgs>;

export const DomainsCreateOneZodSchema = z.object({ select: DomainsSelectObjectSchema.optional(), include: DomainsIncludeObjectSchema.optional(), data: z.union([DomainsCreateInputObjectSchema, DomainsUncheckedCreateInputObjectSchema]) }).strict();