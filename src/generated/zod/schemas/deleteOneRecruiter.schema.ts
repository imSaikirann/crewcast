import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterSelectObjectSchema as RecruiterSelectObjectSchema } from './objects/RecruiterSelect.schema';
import { RecruiterIncludeObjectSchema as RecruiterIncludeObjectSchema } from './objects/RecruiterInclude.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './objects/RecruiterWhereUniqueInput.schema';

export const RecruiterDeleteOneSchema: z.ZodType<Prisma.RecruiterDeleteArgs> = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), where: RecruiterWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RecruiterDeleteArgs>;

export const RecruiterDeleteOneZodSchema = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), where: RecruiterWhereUniqueInputObjectSchema }).strict();