import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterSelectObjectSchema as RecruiterSelectObjectSchema } from './objects/RecruiterSelect.schema';
import { RecruiterIncludeObjectSchema as RecruiterIncludeObjectSchema } from './objects/RecruiterInclude.schema';
import { RecruiterCreateInputObjectSchema as RecruiterCreateInputObjectSchema } from './objects/RecruiterCreateInput.schema';
import { RecruiterUncheckedCreateInputObjectSchema as RecruiterUncheckedCreateInputObjectSchema } from './objects/RecruiterUncheckedCreateInput.schema';

export const RecruiterCreateOneSchema: z.ZodType<Prisma.RecruiterCreateArgs> = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), data: z.union([RecruiterCreateInputObjectSchema, RecruiterUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RecruiterCreateArgs>;

export const RecruiterCreateOneZodSchema = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), data: z.union([RecruiterCreateInputObjectSchema, RecruiterUncheckedCreateInputObjectSchema]) }).strict();