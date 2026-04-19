import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreUpdateManyMutationInputObjectSchema as ApplicationScoreUpdateManyMutationInputObjectSchema } from './objects/ApplicationScoreUpdateManyMutationInput.schema';
import { ApplicationScoreWhereInputObjectSchema as ApplicationScoreWhereInputObjectSchema } from './objects/ApplicationScoreWhereInput.schema';

export const ApplicationScoreUpdateManySchema: z.ZodType<Prisma.ApplicationScoreUpdateManyArgs> = z.object({ data: ApplicationScoreUpdateManyMutationInputObjectSchema, where: ApplicationScoreWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreUpdateManyArgs>;

export const ApplicationScoreUpdateManyZodSchema = z.object({ data: ApplicationScoreUpdateManyMutationInputObjectSchema, where: ApplicationScoreWhereInputObjectSchema.optional() }).strict();