import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './objects/RecruiterWhereInput.schema';

export const RecruiterDeleteManySchema: z.ZodType<Prisma.RecruiterDeleteManyArgs> = z.object({ where: RecruiterWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterDeleteManyArgs>;

export const RecruiterDeleteManyZodSchema = z.object({ where: RecruiterWhereInputObjectSchema.optional() }).strict();