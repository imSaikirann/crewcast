import * as z from 'zod';
export const VerificationTokenGroupByResultSchema = z.array(z.object({
  id: z.string(),
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
  _count: z.object({
    id: z.number(),
    identifier: z.number(),
    token: z.number(),
    expires: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    identifier: z.string().nullable(),
    token: z.string().nullable(),
    expires: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    identifier: z.string().nullable(),
    token: z.string().nullable(),
    expires: z.date().nullable()
  }).nullable().optional()
}));