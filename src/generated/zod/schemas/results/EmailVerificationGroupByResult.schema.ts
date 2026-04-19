import * as z from 'zod';
export const EmailVerificationGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  tokenHash: z.string(),
  expiresAt: z.date(),
  used: z.boolean(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    email: z.number(),
    tokenHash: z.number(),
    expiresAt: z.number(),
    used: z.number(),
    createdAt: z.number(),
    user: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    email: z.string().nullable(),
    tokenHash: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    email: z.string().nullable(),
    tokenHash: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));