import * as z from 'zod';
export const DomainsAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    title: z.number(),
    description: z.number(),
    jobCount: z.number(),
    haveDefaultForm: z.number(),
    isActive: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    recruiterForms: z.number(),
    defaultFormSchemas: z.number()
  }).optional(),
  _sum: z.object({
    jobCount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    jobCount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    jobCount: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    jobCount: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});