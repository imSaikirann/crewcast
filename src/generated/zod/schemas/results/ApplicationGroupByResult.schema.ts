import * as z from 'zod';
export const ApplicationGroupByResultSchema = z.array(z.object({
  id: z.string(),
  jobId: z.string(),
  fullName: z.string(),
  email: z.string(),
  responses: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    jobId: z.number(),
    job: z.number(),
    fullName: z.number(),
    email: z.number(),
    responses: z.number(),
    status: z.number(),
    scores: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    jobId: z.string().nullable(),
    fullName: z.string().nullable(),
    email: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    jobId: z.string().nullable(),
    fullName: z.string().nullable(),
    email: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));