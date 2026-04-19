import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreWhereInputObjectSchema as ApplicationScoreWhereInputObjectSchema } from './objects/ApplicationScoreWhereInput.schema';

export const ApplicationScoreDeleteManySchema: z.ZodType<Prisma.ApplicationScoreDeleteManyArgs> = z.object({ where: ApplicationScoreWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreDeleteManyArgs>;

export const ApplicationScoreDeleteManyZodSchema = z.object({ where: ApplicationScoreWhereInputObjectSchema.optional() }).strict();