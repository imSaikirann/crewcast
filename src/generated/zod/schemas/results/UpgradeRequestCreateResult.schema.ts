import * as z from 'zod';
export const UpgradeRequestCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  company: z.string(),
  plan: z.string(),
  status: z.string(),
  createdAt: z.date()
});