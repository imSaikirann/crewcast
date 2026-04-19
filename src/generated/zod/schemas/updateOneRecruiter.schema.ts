import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterSelectObjectSchema as RecruiterSelectObjectSchema } from './objects/RecruiterSelect.schema';
import { RecruiterIncludeObjectSchema as RecruiterIncludeObjectSchema } from './objects/RecruiterInclude.schema';
import { RecruiterUpdateInputObjectSchema as RecruiterUpdateInputObjectSchema } from './objects/RecruiterUpdateInput.schema';
import { RecruiterUncheckedUpdateInputObjectSchema as RecruiterUncheckedUpdateInputObjectSchema } from './objects/RecruiterUncheckedUpdateInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './objects/RecruiterWhereUniqueInput.schema';

export const RecruiterUpdateOneSchema: z.ZodType<Prisma.RecruiterUpdateArgs> = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), data: z.union([RecruiterUpdateInputObjectSchema, RecruiterUncheckedUpdateInputObjectSchema]), where: RecruiterWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RecruiterUpdateArgs>;

export const RecruiterUpdateOneZodSchema = z.object({ select: RecruiterSelectObjectSchema.optional(), include: RecruiterIncludeObjectSchema.optional(), data: z.union([RecruiterUpdateInputObjectSchema, RecruiterUncheckedUpdateInputObjectSchema]), where: RecruiterWhereUniqueInputObjectSchema }).strict();