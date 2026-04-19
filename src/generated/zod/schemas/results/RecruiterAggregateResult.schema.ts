import * as z from 'zod';
export const RecruiterAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    companyName: z.number(),
    companyEmail: z.number(),
    website: z.number(),
    linkedinLink: z.number(),
    verified: z.number(),
    plan: z.number(),
    formLimit: z.number(),
    activeFormCount: z.number(),
    totalFormsCount: z.number(),
    totalFormsLimit: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    recruiterForms: z.number(),
    verification: z.number()
  }).optional(),
  _sum: z.object({
    formLimit: z.number().nullable(),
    activeFormCount: z.number().nullable(),
    totalFormsCount: z.number().nullable(),
    totalFormsLimit: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    formLimit: z.number().nullable(),
    activeFormCount: z.number().nullable(),
    totalFormsCount: z.number().nullable(),
    totalFormsLimit: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    companyName: z.string().nullable(),
    companyEmail: z.string().nullable(),
    website: z.string().nullable(),
    linkedinLink: z.string().nullable(),
    formLimit: z.number().int().nullable(),
    activeFormCount: z.number().int().nullable(),
    totalFormsCount: z.number().int().nullable(),
    totalFormsLimit: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    companyName: z.string().nullable(),
    companyEmail: z.string().nullable(),
    website: z.string().nullable(),
    linkedinLink: z.string().nullable(),
    formLimit: z.number().int().nullable(),
    activeFormCount: z.number().int().nullable(),
    totalFormsCount: z.number().int().nullable(),
    totalFormsLimit: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});