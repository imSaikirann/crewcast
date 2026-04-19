import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional()
}).strict();
export const RecruiterCountOutputTypeCountRecruiterFormsArgsObjectSchema = makeSchema();
export const RecruiterCountOutputTypeCountRecruiterFormsArgsObjectZodSchema = makeSchema();
