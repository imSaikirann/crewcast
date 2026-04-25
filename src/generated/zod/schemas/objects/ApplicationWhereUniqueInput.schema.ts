import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationJobIdEmailCompoundUniqueInputObjectSchema as ApplicationJobIdEmailCompoundUniqueInputObjectSchema } from './ApplicationJobIdEmailCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  trackingToken: z.string().optional(),
  jobId_email: z.lazy(() => ApplicationJobIdEmailCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ApplicationWhereUniqueInputObjectSchema: z.ZodType<Prisma.ApplicationWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationWhereUniqueInput>;
export const ApplicationWhereUniqueInputObjectZodSchema = makeSchema();
