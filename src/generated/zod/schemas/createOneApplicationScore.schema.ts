import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreSelectObjectSchema as ApplicationScoreSelectObjectSchema } from './objects/ApplicationScoreSelect.schema';
import { ApplicationScoreIncludeObjectSchema as ApplicationScoreIncludeObjectSchema } from './objects/ApplicationScoreInclude.schema';
import { ApplicationScoreCreateInputObjectSchema as ApplicationScoreCreateInputObjectSchema } from './objects/ApplicationScoreCreateInput.schema';
import { ApplicationScoreUncheckedCreateInputObjectSchema as ApplicationScoreUncheckedCreateInputObjectSchema } from './objects/ApplicationScoreUncheckedCreateInput.schema';

export const ApplicationScoreCreateOneSchema: z.ZodType<Prisma.ApplicationScoreCreateArgs> = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), data: z.union([ApplicationScoreCreateInputObjectSchema, ApplicationScoreUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreCreateArgs>;

export const ApplicationScoreCreateOneZodSchema = z.object({ select: ApplicationScoreSelectObjectSchema.optional(), include: ApplicationScoreIncludeObjectSchema.optional(), data: z.union([ApplicationScoreCreateInputObjectSchema, ApplicationScoreUncheckedCreateInputObjectSchema]) }).strict();