import * as z from 'zod';
export const UpgradeRequestAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    email: z.number(),
    company: z.number(),
    plan: z.number(),
    status: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    email: z.string().nullable(),
    company: z.string().nullable(),
    plan: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    email: z.string().nullable(),
    company: z.string().nullable(),
    plan: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});