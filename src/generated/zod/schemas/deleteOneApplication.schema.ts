import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationSelectObjectSchema as ApplicationSelectObjectSchema } from './objects/ApplicationSelect.schema';
import { ApplicationIncludeObjectSchema as ApplicationIncludeObjectSchema } from './objects/ApplicationInclude.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './objects/ApplicationWhereUniqueInput.schema';

export const ApplicationDeleteOneSchema: z.ZodType<Prisma.ApplicationDeleteArgs> = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), where: ApplicationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ApplicationDeleteArgs>;

export const ApplicationDeleteOneZodSchema = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), where: ApplicationWhereUniqueInputObjectSchema }).strict();