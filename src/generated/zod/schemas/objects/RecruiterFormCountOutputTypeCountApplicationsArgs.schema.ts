import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './ApplicationWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormCountOutputTypeCountApplicationsArgsObjectSchema = makeSchema();
export const RecruiterFormCountOutputTypeCountApplicationsArgsObjectZodSchema = makeSchema();
