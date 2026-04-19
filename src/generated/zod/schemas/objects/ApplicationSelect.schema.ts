import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormArgsObjectSchema as RecruiterFormArgsObjectSchema } from './RecruiterFormArgs.schema';
import { ApplicationScoreFindManySchema as ApplicationScoreFindManySchema } from '../findManyApplicationScore.schema';
import { ApplicationCountOutputTypeArgsObjectSchema as ApplicationCountOutputTypeArgsObjectSchema } from './ApplicationCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  job: z.union([z.boolean(), z.lazy(() => RecruiterFormArgsObjectSchema)]).optional(),
  fullName: z.boolean().optional(),
  email: z.boolean().optional(),
  responses: z.boolean().optional(),
  status: z.boolean().optional(),
  scores: z.union([z.boolean(), z.lazy(() => ApplicationScoreFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => ApplicationCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ApplicationSelectObjectSchema: z.ZodType<Prisma.ApplicationSelect> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationSelect>;
export const ApplicationSelectObjectZodSchema = makeSchema();
