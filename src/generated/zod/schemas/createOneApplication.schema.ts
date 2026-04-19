import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationSelectObjectSchema as ApplicationSelectObjectSchema } from './objects/ApplicationSelect.schema';
import { ApplicationIncludeObjectSchema as ApplicationIncludeObjectSchema } from './objects/ApplicationInclude.schema';
import { ApplicationCreateInputObjectSchema as ApplicationCreateInputObjectSchema } from './objects/ApplicationCreateInput.schema';
import { ApplicationUncheckedCreateInputObjectSchema as ApplicationUncheckedCreateInputObjectSchema } from './objects/ApplicationUncheckedCreateInput.schema';

export const ApplicationCreateOneSchema: z.ZodType<Prisma.ApplicationCreateArgs> = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), data: z.union([ApplicationCreateInputObjectSchema, ApplicationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ApplicationCreateArgs>;

export const ApplicationCreateOneZodSchema = z.object({ select: ApplicationSelectObjectSchema.optional(), include: ApplicationIncludeObjectSchema.optional(), data: z.union([ApplicationCreateInputObjectSchema, ApplicationUncheckedCreateInputObjectSchema]) }).strict();