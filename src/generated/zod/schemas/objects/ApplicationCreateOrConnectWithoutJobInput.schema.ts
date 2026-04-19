import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema';
import { ApplicationCreateWithoutJobInputObjectSchema as ApplicationCreateWithoutJobInputObjectSchema } from './ApplicationCreateWithoutJobInput.schema';
import { ApplicationUncheckedCreateWithoutJobInputObjectSchema as ApplicationUncheckedCreateWithoutJobInputObjectSchema } from './ApplicationUncheckedCreateWithoutJobInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ApplicationCreateWithoutJobInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutJobInputObjectSchema)])
}).strict();
export const ApplicationCreateOrConnectWithoutJobInputObjectSchema: z.ZodType<Prisma.ApplicationCreateOrConnectWithoutJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateOrConnectWithoutJobInput>;
export const ApplicationCreateOrConnectWithoutJobInputObjectZodSchema = makeSchema();
