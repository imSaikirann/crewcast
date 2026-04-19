import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  jobId: z.string(),
  email: z.string()
}).strict();
export const ApplicationJobIdEmailCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ApplicationJobIdEmailCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationJobIdEmailCompoundUniqueInput>;
export const ApplicationJobIdEmailCompoundUniqueInputObjectZodSchema = makeSchema();
