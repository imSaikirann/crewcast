import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  tokenHash: z.string().optional()
}).strict();
export const EmailVerificationWhereUniqueInputObjectSchema: z.ZodType<Prisma.EmailVerificationWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EmailVerificationWhereUniqueInput>;
export const EmailVerificationWhereUniqueInputObjectZodSchema = makeSchema();
