import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreSelectObjectSchema as ApplicationScoreSelectObjectSchema } from './objects/ApplicationScoreSelect.schema';
import { ApplicationScoreIncludeObjectSchema as ApplicationScoreIncludeObjectSchema } from './objects/ApplicationScoreInclude.schema';
import { ApplicationScoreUpdateInputObjectSchema as ApplicationScoreUpdateInputObjectSchema } from './objects/ApplicationScoreUpdateInput.schema';
import { ApplicationScoreUncheckedUpdateInputObjectSchema as ApplicationScoreUncheckedUpdateInputObjectSchema } from './objects/ApplicationScoreUncheckedUpdateInput.schema';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './objects/ApplicationScoreWhereUniqueInput.schema';

export const ApplicationScoreUpdateOneSchema: z.ZodType<Prisma.ApplicationScoreUpdateArgs> = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), data: z.union([ApplicationScoreUpdateInputObjectSchema, ApplicationScoreUncheckedUpdateInputObjectSchema]), where: ApplicationScoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreUpdateArgs>;

export const ApplicationScoreUpdateOneZodSchema = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), data: z.union([ApplicationScoreUpdateInputObjectSchema, ApplicationScoreUncheckedUpdateInputObjectSchema]), where: ApplicationScoreWhereUniqueInputObjectSchema }).strict();