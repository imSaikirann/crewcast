import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ApplicationOrderByWithRelationInputObjectSchema as ApplicationOrderByWithRelationInputObjectSchema } from './ApplicationOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  applicationId: SortOrderSchema.optional(),
  totalScore: SortOrderSchema.optional(),
  breakdown: SortOrderSchema.optional(),
  evaluatedAt: SortOrderSchema.optional(),
  application: z.lazy(() => ApplicationOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ApplicationScoreOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreOrderByWithRelationInput>;
export const ApplicationScoreOrderByWithRelationInputObjectZodSchema = makeSchema();
