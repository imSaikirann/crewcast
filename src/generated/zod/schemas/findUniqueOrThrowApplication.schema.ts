import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationSelectObjectSchema as ApplicationSelectObjectSchema } from './objects/ApplicationSelect.schema';
import { ApplicationIncludeObjectSchema as ApplicationIncludeObjectSchema } from './objects/ApplicationInclude.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './objects/ApplicationWhereUniqueInput.schema';

export const ApplicationFindUniqueOrThrowSchema: z.ZodType<Prisma.ApplicationFindUniqueOrThrowArgs> = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), where: ApplicationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ApplicationFindUniqueOrThrowArgs>;

export const ApplicationFindUniqueOrThrowZodSchema = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), where: ApplicationWhereUniqueInputObjectSchema }).strict();