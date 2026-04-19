import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationSelectObjectSchema as ApplicationSelectObjectSchema } from './objects/ApplicationSelect.schema';
import { ApplicationIncludeObjectSchema as ApplicationIncludeObjectSchema } from './objects/ApplicationInclude.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './objects/ApplicationWhereUniqueInput.schema';
import { ApplicationCreateInputObjectSchema as ApplicationCreateInputObjectSchema } from './objects/ApplicationCreateInput.schema';
import { ApplicationUncheckedCreateInputObjectSchema as ApplicationUncheckedCreateInputObjectSchema } from './objects/ApplicationUncheckedCreateInput.schema';
import { ApplicationUpdateInputObjectSchema as ApplicationUpdateInputObjectSchema } from './objects/ApplicationUpdateInput.schema';
import { ApplicationUncheckedUpdateInputObjectSchema as ApplicationUncheckedUpdateInputObjectSchema } from './objects/ApplicationUncheckedUpdateInput.schema';

export const ApplicationUpsertOneSchema: z.ZodType<Prisma.ApplicationUpsertArgs> = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), where: ApplicationWhereUniqueInputObjectSchema, create: z.union([ ApplicationCreateInputObjectSchema, ApplicationUncheckedCreateInputObjectSchema ]), update: z.union([ ApplicationUpdateInputObjectSchema, ApplicationUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ApplicationUpsertArgs>;

export const ApplicationUpsertOneZodSchema = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), where: ApplicationWhereUniqueInputObjectSchema, create: z.union([ ApplicationCreateInputObjectSchema, ApplicationUncheckedCreateInputObjectSchema ]), update: z.union([ ApplicationUpdateInputObjectSchema, ApplicationUncheckedUpdateInputObjectSchema ]) }).strict();