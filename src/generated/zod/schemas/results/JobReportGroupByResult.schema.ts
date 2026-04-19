import * as z from 'zod';
export const JobReportGroupByResultSchema = z.array(z.object({
  id: z.string(),
  formId: z.string(),
  reason: z.string(),
  message: z.string(),
  ip: z.string(),
  userAgent: z.string(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    formId: z.number(),
    form: z.number(),
    reason: z.number(),
    message: z.number(),
    ip: z.number(),
    userAgent: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    formId: z.string().nullable(),
    reason: z.string().nullable(),
    message: z.string().nullable(),
    ip: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    formId: z.string().nullable(),
    reason: z.string().nullable(),
    message: z.string().nullable(),
    ip: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));