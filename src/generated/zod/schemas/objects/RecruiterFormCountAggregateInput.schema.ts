import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  recruiterId: z.literal(true).optional(),
  domainId: z.literal(true).optional(),
  publicId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  specialization: z.literal(true).optional(),
  roleType: z.literal(true).optional(),
  experience: z.literal(true).optional(),
  workMode: z.literal(true).optional(),
  location: z.literal(true).optional(),
  salaryMin: z.literal(true).optional(),
  salaryMax: z.literal(true).optional(),
  currency: z.literal(true).optional(),
  techStack: z.literal(true).optional(),
  contractDurationMonths: z.literal(true).optional(),
  showCompanyName: z.literal(true).optional(),
  status: z.literal(true).optional(),
  version: z.literal(true).optional(),
  publishedAt: z.literal(true).optional(),
  fields: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  reportCount: z.literal(true).optional(),
  isFlagged: z.literal(true).optional(),
  viewCount: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RecruiterFormCountAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterFormCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCountAggregateInputType>;
export const RecruiterFormCountAggregateInputObjectZodSchema = makeSchema();
