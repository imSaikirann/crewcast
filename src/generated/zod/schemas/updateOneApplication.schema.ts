import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationSelectObjectSchema as ApplicationSelectObjectSchema } from './objects/ApplicationSelect.schema';
import { ApplicationIncludeObjectSchema as ApplicationIncludeObjectSchema } from './objects/ApplicationInclude.schema';
import { ApplicationUpdateInputObjectSchema as ApplicationUpdateInputObjectSchema } from './objects/ApplicationUpdateInput.schema';
import { ApplicationUncheckedUpdateInputObjectSchema as ApplicationUncheckedUpdateInputObjectSchema } from './objects/ApplicationUncheckedUpdateInput.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './objects/ApplicationWhereUniqueInput.schema';

export const ApplicationUpdateOneSchema: z.ZodType<Prisma.ApplicationUpdateArgs> = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), data: z.union([ApplicationUpdateInputObjectSchema, ApplicationUncheckedUpdateInputObjectSchema]), where: ApplicationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ApplicationUpdateArgs>;

export const ApplicationUpdateOneZodSchema = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), data: z.union([ApplicationUpdateInputObjectSchema, ApplicationUncheckedUpdateInputObjectSchema]), where: ApplicationWhereUniqueInputObjectSchema }).strict();