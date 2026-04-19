import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreSelectObjectSchema as ApplicationScoreSelectObjectSchema } from './objects/ApplicationScoreSelect.schema';
import { ApplicationScoreIncludeObjectSchema as ApplicationScoreIncludeObjectSchema } from './objects/ApplicationScoreInclude.schema';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './objects/ApplicationScoreWhereUniqueInput.schema';
import { ApplicationScoreCreateInputObjectSchema as ApplicationScoreCreateInputObjectSchema } from './objects/ApplicationScoreCreateInput.schema';
import { ApplicationScoreUncheckedCreateInputObjectSchema as ApplicationScoreUncheckedCreateInputObjectSchema } from './objects/ApplicationScoreUncheckedCreateInput.schema';
import { ApplicationScoreUpdateInputObjectSchema as ApplicationScoreUpdateInputObjectSchema } from './objects/ApplicationScoreUpdateInput.schema';
import { ApplicationScoreUncheckedUpdateInputObjectSchema as ApplicationScoreUncheckedUpdateInputObjectSchema } from './objects/ApplicationScoreUncheckedUpdateInput.schema';

export const ApplicationScoreUpsertOneSchema: z.ZodType<Prisma.ApplicationScoreUpsertArgs> = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), where: ApplicationScoreWhereUniqueInputObjectSchema, create: z.union([ ApplicationScoreCreateInputObjectSchema, ApplicationScoreUncheckedCreateInputObjectSchema ]), update: z.union([ ApplicationScoreUpdateInputObjectSchema, ApplicationScoreUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreUpsertArgs>;

export const ApplicationScoreUpsertOneZodSchema = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), where: ApplicationScoreWhereUniqueInputObjectSchema, create: z.union([ ApplicationScoreCreateInputObjectSchema, ApplicationScoreUncheckedCreateInputObjectSchema ]), update: z.union([ ApplicationScoreUpdateInputObjectSchema, ApplicationScoreUncheckedUpdateInputObjectSchema ]) }).strict();