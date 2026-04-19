import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreSelectObjectSchema as ApplicationScoreSelectObjectSchema } from './objects/ApplicationScoreSelect.schema';
import { ApplicationScoreIncludeObjectSchema as ApplicationScoreIncludeObjectSchema } from './objects/ApplicationScoreInclude.schema';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './objects/ApplicationScoreWhereUniqueInput.schema';

export const ApplicationScoreFindUniqueOrThrowSchema: z.ZodType<Prisma.ApplicationScoreFindUniqueOrThrowArgs> = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), where: ApplicationScoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreFindUniqueOrThrowArgs>;

export const ApplicationScoreFindUniqueOrThrowZodSchema = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), where: ApplicationScoreWhereUniqueInputObjectSchema }).strict();