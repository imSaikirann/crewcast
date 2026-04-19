import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailVerificationWhereInputObjectSchema as EmailVerificationWhereInputObjectSchema } from './EmailVerificationWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EmailVerificationWhereInputObjectSchema).optional()
}).strict();
export const RecruiterCountOutputTypeCountVerificationArgsObjectSchema = makeSchema();
export const RecruiterCountOutputTypeCountVerificationArgsObjectZodSchema = makeSchema();
