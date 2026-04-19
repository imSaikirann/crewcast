import * as z from 'zod';
export const EmailVerificationUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  tokenHash: z.string(),
  expiresAt: z.date(),
  used: z.boolean(),
  createdAt: z.date(),
  user: z.unknown()
});