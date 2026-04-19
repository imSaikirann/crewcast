import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterSelectObjectSchema as RecruiterSelectObjectSchema } from './objects/RecruiterSelect.schema';
import { RecruiterIncludeObjectSchema as RecruiterIncludeObjectSchema } from './objects/RecruiterInclude.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './objects/RecruiterWhereUniqueInput.schema';
import { RecruiterCreateInputObjectSchema as RecruiterCreateInputObjectSchema } from './objects/RecruiterCreateInput.schema';
import { RecruiterUncheckedCreateInputObjectSchema as RecruiterUncheckedCreateInputObjectSchema } from './objects/RecruiterUncheckedCreateInput.schema';
import { RecruiterUpdateInputObjectSchema as RecruiterUpdateInputObjectSchema } from './objects/RecruiterUpdateInput.schema';
import { RecruiterUncheckedUpdateInputObjectSchema as RecruiterUncheckedUpdateInputObjectSchema } from './objects/RecruiterUncheckedUpdateInput.schema';

export const RecruiterUpsertOneSchema: z.ZodType<Prisma.RecruiterUpsertArgs> = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), where: RecruiterWhereUniqueInputObjectSchema, create: z.union([ RecruiterCreateInputObjectSchema, RecruiterUncheckedCreateInputObjectSchema ]), update: z.union([ RecruiterUpdateInputObjectSchema, RecruiterUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RecruiterUpsertArgs>;

export const RecruiterUpsertOneZodSchema = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), where: RecruiterWhereUniqueInputObjectSchema, create: z.union([ RecruiterCreateInputObjectSchema, RecruiterUncheckedCreateInputObjectSchema ]), update: z.union([ RecruiterUpdateInputObjectSchema, RecruiterUncheckedUpdateInputObjectSchema ]) }).strict();