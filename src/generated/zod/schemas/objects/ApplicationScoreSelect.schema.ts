import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationArgsObjectSchema as ApplicationArgsObjectSchema } from './ApplicationArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  applicationId: z.boolean().optional(),
  application: z.union([z.boolean(), z.lazy(() => ApplicationArgsObjectSchema)]).optional(),
  totalScore: z.boolean().optional(),
  breakdown: z.boolean().optional(),
  evaluatedAt: z.boolean().optional()
}).strict();
export const ApplicationScoreSelectObjectSchema: z.ZodType<Prisma.ApplicationScoreSelect> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreSelect>;
export const ApplicationScoreSelectObjectZodSchema = makeSchema();
